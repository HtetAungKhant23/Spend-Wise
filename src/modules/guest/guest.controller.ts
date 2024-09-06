import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { IResponse } from '@app/core/interfaces/response.interface';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestProfileDto } from './dto/guest-profile.dto';
import { BookingPeriodDto } from './dto/booking.dto';

@ApiTags('Guest')
@Controller({
  version: '1',
})
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post()
  @ApiOperation({ description: 'Create guest' })
  @ApiBody({ type: CreateGuestDto })
  async createGuest(@Body() dto: CreateGuestDto): Promise<IResponse> {
    try {
      const newGuests = await this.guestService.createGuest(dto);
      return {
        _data: newGuests,
        _metadata: {
          message: 'Guests created successfully.',
          statusCode: HttpStatus.CREATED,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to create guest.',
      });
    }
  }

  @Get()
  @ApiOperation({ description: 'Fetch all guest' })
  async fetchGuest(): Promise<IResponse> {
    try {
      const guests = await this.guestService.fetchGuest();
      return {
        _data: guests,
        _metadata: {
          message: 'Guests fetched successfully.',
          statusCode: HttpStatus.OK,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to fetch all guest.',
      });
    }
  }

  @Patch(':id/profile')
  @ApiOperation({ description: 'Update guest profile' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: GuestProfileDto })
  async updateGuestProfile(@Param('id') guestId: string, @Body() dto: GuestProfileDto): Promise<IResponse> {
    try {
      const updGuest = await this.guestService.updateGuestProfile(guestId, dto);
      return {
        _data: updGuest,
        _metadata: {
          message: 'Guest profile updated successfully.',
          statusCode: HttpStatus.OK,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to delete guest.',
      });
    }
  }

  @Post(':id/extend-booking-period')
  @ApiOperation({ description: "Extend guest's booking period" })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: BookingPeriodDto })
  async extendBookingPeriod(@Param('id') guestId: string, @Body() dto: BookingPeriodDto): Promise<IResponse> {
    try {
      const extendedBookingPeriod = await this.guestService.extendBookingPeriod(guestId, dto);
      return {
        _data: extendedBookingPeriod,
        _metadata: {
          message: 'Booking period extended successfully.',
          statusCode: HttpStatus.CREATED,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to extend booking period.',
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete guest' })
  @ApiParam({ name: 'id', type: String })
  async deleteGuest(@Param('id') guestId: string): Promise<IResponse> {
    try {
      await this.guestService.deleteGuest(guestId);
      return {
        _data: {},
        _metadata: {
          message: 'Guest deleted successfully.',
          statusCode: HttpStatus.NO_CONTENT,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to delete guest.',
      });
    }
  }
}
