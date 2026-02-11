import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm"

@Module({
  imports: [
    HttpModule,
    // TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}