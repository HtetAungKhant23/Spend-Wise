import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { IAuthService } from './interfaces/auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly dbService: PrismaService) {}

  async register(): Promise<void> {
    console.log('hi');
  }

  async login(): Promise<any> {
    return 'wuwuwu';
  }

  async getMe(): Promise<any> {
    return 'hehehrhr';
  }
}
