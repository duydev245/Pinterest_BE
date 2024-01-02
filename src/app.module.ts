import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';

@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({
    isGlobal: true
  }), ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
