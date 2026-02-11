import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity'
import { TossUserDto } from 'src/auth/dto/toss-auth.dto';
import { Transactional } from '@nestjs-cls/transactional';
import { Repository } from 'typeorm';

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  @Transactional()
  async findOrCreate(userData: TossUserDto): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { di: userData.di }
    });

    if (existUser) {
      return existUser;
    }

    const newUser = this.userRepository.create({
      di: userData.di,
      ci: userData.ci,
      name: userData.name,
      birthday: userData.birthday,
      gender: userData.gender,
      nationality: userData.nationality,
    });
    
    return await this.userRepository.save(newUser);
  }
}
