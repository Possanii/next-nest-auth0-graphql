import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [DatabaseModule, AuthModule, HttpModule, MessagingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
