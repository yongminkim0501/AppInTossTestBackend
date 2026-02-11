import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {firstValueFrom} from 'rxjs';
import { UserService } from 'src/user/user.service';
import { SecurityService } from 'core/core.security'
import { TossUserDto } from 'src/auth/dto/toss-auth.dto';
import { TossResultResponseDto } from './dto/toss-auth.dto';

@Injectable()
export class AuthService{
  constructor(
    private readonly securityService: SecurityService,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ){}
  
  async getTossAccessToken(txID: string){
    const sessionKey = this.securityService.generateSessionKey();
    const tossApiUrl = 'https://api.toss.im/uapi/v1/auth/result';
    const payload = {
      txID: txID,
      sessionKey: sessionKey // 전자서명 -> 토스가 이 값으로 암호화 진행
    };
    try{
      const response = await firstValueFrom(
        this.httpService.post<TossResultResponseDto>(tossApiUrl, payload, {
          headers: { Authorization: `Bearer ${process.env.TOSS_API_KEY}` } // 백틱 이용해서 변수 입력 Option + ₩ 키 누르거나 영문 상태로 누르기
        })
      );

      const result = response.data;

      if (result.resultType === 'FAIL'){
        throw new BadRequestException(`Toss Auth Failed: ${result.error?.message} (${result.error?.code})`)
      };
      if (!result.success) {
        throw new InternalServerErrorException('Toss response is missing success data');
      };
      
      const decryptedJson = this.securityService.decryptPersonal(
        result.success.personalData,
        sessionKey,
        result.success.iv
      );

      const userData: TossUserDto = JSON.parse(decryptedJson); 
      
      return await this.userService.findOrCreate(userData);

    }catch(error) {
      if (error.response?.status === 401) {
      throw new UnauthorizedException('토스 API 키가 유효하지 않습니다.');
    }
    throw error;
    }
  }
}
