export class TossResultResponseDto {
  resultType: string;
  success?: {
    personalData: string;
    iv: string;          
  };
  error?: {
    code: string;
    message: string;
  };
}
export class TossUserDto {
  ci: string;
  di: string;
  name: string;
  birthday: string;
  gender: 'MALE' | 'FEMALE';
  nationality: 'LOCAL' | 'FOREIGNER';
  ageGroup: 'ADULT' | 'MINOR';
}