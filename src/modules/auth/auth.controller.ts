import { Controller, Get, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthService } from './interfaces/auth-service.interface';

@Controller({
  version: '1',
})
export class AuthController {
  constructor(@Inject(AuthService) private authService: IAuthService) {}

  @Get('me')
  async getMe() {
    return this.authService.getMe();
  }
}
