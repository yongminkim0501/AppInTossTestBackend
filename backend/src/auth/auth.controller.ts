import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service'; // 같은 폴더면 ./ 가 맞습니다

@Controller('auth') // 이 주소로 들어오면 (http://localhost:3000/auth)
export class AuthController {
  // 생성자에서 서비스를 주입받습니다.
  constructor(private readonly authService: AuthService) {}

  @Get('token') // 세부 주소 (http://localhost:3000/auth/token)
  async getUserToken() {
    // 서비스의 함수를 호출합니다.
    return await this.authService.getTossAccessToken();
  }
}