import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // main.ts or app.module.ts
const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(8080);
}
bootstrap();

// token mã hóa 
// yarn add @nestjs/passport passport passport-local
// yarn add @nestjs/jwt passport-jwt
// yarn add -D @types/passport-jwt