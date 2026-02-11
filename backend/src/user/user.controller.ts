import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}

  @Post('toss-login')
  async handleTossLogin(@Body('txId') txId: string){
    const user = await this.authService.getTossAccessToken(txId);
    return {
      message: 'Login success',
      user: {
        id : user.id,
        name : user.name,
      }
    }
  }

}