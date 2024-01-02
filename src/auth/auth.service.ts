import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import { signinDto } from './dto/signin-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  prisma = new PrismaClient();

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  // Post Sign Up
  async signUp(email: string, mat_khau: string) {
    let emailExists = await this.userService.checkEmailExists(email);
    if (emailExists) {
      return { message: 'Email already exists', status: HttpStatus.BAD_REQUEST };

    }
    const user = await this.userService.createUser(email, mat_khau);

    return { message: 'User registered successfully', status: HttpStatus.OK, user };

  }

  async findAll() {
    let data = await this.prisma.nguoi_dung.findMany();
    return data;
  }

  // Post Sign In
  async signin(email: string, mat_khau: string) {
    try {

      const user = await this.userService.findByEmail(email)
      if (!user) {
        return { message: 'wrong Mail', status: 500 }
      }
      const checkPass = await this.userService.verifyPass(mat_khau, user.mat_khau)

      if (!checkPass) {
        return { message: 'Invalid password', status: 500 }
      }
      let token = this.jwtService.signAsync({
        data: { nguoi_dung_id: user.nguoi_dung_id }
      }, { expiresIn: "1d", secret: "DOAN_XEM" })
      console.log(token);
      return token;

    } catch (err) {
      return { message: 'Failed to sign in', status: 500 }
    }
  }

}
