import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { signinDto } from './dto/signin-dto'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  // API Post Sign Up
  // localhost:8080/auth/signup
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
     return  await this.authService.signUp(createUserDto.email, createUserDto.mat_khau);      
    } catch (error) {
      return {
        message:'Failed to register user',
        status:HttpStatus.INTERNAL_SERVER_ERROR
      }
    }
  }

  // API Post Sign In
  // localhost:8080/auth/signin
  @Post('signin')
  async signin(@Body() signinDto:signinDto){
    try {
      let {email, mat_khau} = signinDto;
      let data = await this.authService.signin(email,mat_khau);
      return data

    } catch (error) {
      return{message:'Failed to sign in',status:500}
    }
  }
  
  @Get('/test')
  findAll() {
    return this.authService.findAll();
  }

}
