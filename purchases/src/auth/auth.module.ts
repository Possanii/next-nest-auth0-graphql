import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationGuard } from './authorization/authorization.guard';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AuthorizationGuard],
  exports: [AuthorizationGuard],
})
export class AuthModule {}
