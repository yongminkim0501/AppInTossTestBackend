import { Controller, Get } from '@nestjs/common';
import { AuthService } from './app.service';

@Controller("auth")
export class AuthController{
  constructor(private readonly authService: AuthService){}
  @Get("token") // 주소 : http://localhost:3000/auth/token
  async getUserToken(): Promise<any> {
    return await this.authService.getTossAccessToken()
  }
}