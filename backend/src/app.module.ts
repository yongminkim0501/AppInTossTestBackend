import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { UserModule} from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      plugins: [
        new ClsPluginTransactional({
          imports: [TypeOrmModule],
          adapter: new TransactionalAdapterTypeOrm({
            // 현재 사용 중인 TypeORM의 DataSource를 연결
            dataSourceToken: getDataSourceToken(), 
          }),
        }),
      ],
    }),
    // ... 기존 TypeOrmModule.forRoot 설정
    UserModule, AuthModule
  ],
})
export class AppModule {}