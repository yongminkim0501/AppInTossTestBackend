import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}