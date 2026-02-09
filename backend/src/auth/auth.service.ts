import { Injectable } from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {firstValueFrom} from 'rxjs';

@Injectable()
export class UserRepository{
  constrcutor(
    // 여기에다가 DB 의존성 주입해야 함
  ){}
}

@Injectable()
export class UserService{
  constructor(
    private readonly userRepository: UserRepository
  ){}
  async 
}

@Injectable()
export class AuthService{
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService
  ){}
  
  async getTossAccessToken(){
    const url = 'https://oauth2.cert.toss.im/token';

    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', 'client_id'); // 개발자 실제 ID로 변경
    formData.append('client_secret', 'secret_key'); // 실제 Secret으로 변경
    formData.append('scope', 'ca');

  try {
        // 5. POST 요청 보내기
        const response = await firstValueFrom(
          this.httpService.post(url, formData.toString(), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }),
        );

        return response.data; // 토스가 준 결과(토큰 등) 반환
      } catch (error) {
        console.error('토스 토큰 요청 에러:', error.response?.data || error.message);
        throw error;
      }
    }
  
  async TossLogin(){
    const tossUser = await this.getTossAccessToken()
  }
}