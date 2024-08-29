import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { TestController } from './test.controller';

@Module({
  imports: [ConfigModule, AuthModule, DatabaseModule],
  providers: [],
  controllers: [TestController],
})
export class HttpModule {}
