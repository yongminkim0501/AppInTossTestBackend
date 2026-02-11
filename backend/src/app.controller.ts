import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("app")
export class AppController{
  constructor(private readonly authService: AppService){}
  @Get("token") // 주소 : http://localhost:3000/auth/token
  async getUserToken(): Promise<any> {
  }
}