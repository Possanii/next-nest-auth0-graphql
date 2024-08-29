import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { TestController } from './test.controller';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthModule],
  controllers: [TestController],
})
export class HttpModule {}
