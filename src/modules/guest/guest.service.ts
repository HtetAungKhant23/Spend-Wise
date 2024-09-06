import { PrismaService } from '@app/shared/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { BOOKING_STATUS } from '@prisma/client';
import * as dayjs from 'dayjs';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestProfileDto } from './dto/guest-profile.dto';
import { BookingPeriodDto } from './dto/booking.dto';

@Injectable()
export class GuestService {
  constructor(private readonly dbService: PrismaService) {}

  async fetchGuest() {
    return this.dbService.guest.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        bookingPeriod: true,
      },
    });
  }

  async createGuest(dto: CreateGuestDto) {
    const existGuest = await this.findGuestWithPhone(dto.phone);
    if (existGuest) {
      throw new BadRequestException({
        message: `Guest already exist with this phone number. (${dto.phone})`,
        code: ExceptionConstants.BadRequestCodes.RESOURCE_ALREADY_EXISTS,
      });
    }

    return this.dbService.guest.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        gender: dto.gender,
        bookingPeriod: {
          create: {
            remark: dto?.booking?.remark || '',
            startDate: dayjs(dto.booking.startDate).set('hours', 9).toDate(),
            dueDate: dayjs(dto.booking.startDate).add(dto.booking.period, 'months').set('hours', 9).toDate(),
            period: dto.booking.period,
            seater: dto.booking.seater,
            price: dto.booking.price,
            status: BOOKING_STATUS.PAID,
          },
        },
      },
    });
  }

  async extendBookingPeriod(id: string, dto: BookingPeriodDto) {
    const guest = await this.findGuest(id);
    if (!guest) {
      throw new BadRequestException({
        message: 'Guest not found.',
        code: ExceptionConstants.BadRequestCodes.RESOURCE_NOT_FOUND,
      });
    }

    return this.dbService.bookingPeriod.create({
      data: {
        guestId: guest.id,
        remark: dto?.remark || '',
        startDate: dayjs(dto.startDate).set('hours', 9).toDate(),
        dueDate: dayjs(dto.startDate).add(dto.period, 'months').set('hours', 9).toDate(),
        period: dto.period,
        seater: dto.seater,
        price: dto.price,
        status: BOOKING_STATUS.PAID,
      },
    });
  }

  async updateGuestProfile(id: string, dto: GuestProfileDto) {
    const guest = await this.findGuest(id);
    if (!guest) {
      throw new BadRequestException({
        message: 'Guest not found.',
        code: ExceptionConstants.BadRequestCodes.RESOURCE_NOT_FOUND,
      });
    }

    if (dto?.phone) {
      const existPhone = await this.findGuestWithPhone(dto.phone);
      if (existPhone) {
        throw new BadRequestException({
          message: 'Cannot update profile: Phone number already exist.',
          code: ExceptionConstants.BadRequestCodes.RESOURCE_ALREADY_EXISTS,
        });
      }
    }

    return this.dbService.guest.update({
      where: {
        id: guest.id,
      },
      data: {
        name: dto?.name,
        phone: dto?.phone,
        gender: dto?.gender,
      },
    });
  }

  async deleteGuest(id: string): Promise<void> {
    const guest = await this.findGuest(id);
    if (!guest) {
      throw new BadRequestException({
        message: 'Guest not found.',
        code: ExceptionConstants.BadRequestCodes.RESOURCE_NOT_FOUND,
      });
    }
    await this.dbService.guest.update({
      where: {
        id: guest.id,
      },
      data: {
        isDeleted: true,
        phone: `deleted-${guest.phone}`,
      },
    });
  }

  private async findGuest(id: string) {
    return this.dbService.guest.findUnique({ where: { id, isDeleted: false } });
  }

  private async findGuestWithPhone(phone: string) {
    return this.dbService.guest.findUnique({ where: { phone, isDeleted: false } });
  }
}