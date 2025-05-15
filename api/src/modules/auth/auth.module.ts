import { Module } from '@nestjs/common';
import { AuthRouter } from '.';
import { AuthController, AuthService } from '.';
import { UserModule } from '../user/user.module';
import { HashService, JwtModule } from 'src/services';


@Module({
  controllers: [AuthRouter],
  providers: [AuthController, AuthService, HashService],
  imports: [UserModule, JwtModule]
})
export class AuthModule {}
