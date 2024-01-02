import { HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserService {

  prisma = new PrismaClient();

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async createUser(email: string, mat_khau: string) {
    const hashPass = await bcrypt.hash(mat_khau, 10);
    let data = {
      email: email,
      mat_khau: hashPass
    }
    return this.prisma.nguoi_dung.create({ data })
  }

  async findByEmail(email: string) {
    return this.prisma.nguoi_dung.findFirst({
      where: {
        email
      }
    })
  }

  async verifyPass(mat_khau: string, hashedPass: string) {
    return bcrypt.compare(mat_khau, hashedPass)
  }

  async checkEmailExists(email: string) {
    const existingUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        email
      }
    })
    if (existingUser) {
      return true;
    }
    return false;
  }

  // GET Information of Image and Creator by image_id
  async getImage(id: string) {
    return this.prisma.hinh_anh.findUnique({
      where: {
        hinh_id: +id
      },
      include: {
        nguoi_dung: true
      }
    })
  }

  // GET Comment Data by image_id
  async getCommentsByImageId(imageId: string) {
    return await this.prisma.binh_luan.findMany({
      where: {
        hinh_id: +imageId
      }
    })
  }

  // GET Data if the image is saved by image_id (Token)
  async getSavedInfoByImageId(id: string) {

    let data = await this.prisma.luu_anh.findMany({
      where: {
        hinh_id: +id
      },
      include: {
        nguoi_dung: true,
        hinh_anh: true
      }
    })
    if (data.length === 0) {
      return { message: 'not found', status: 404 };
    }
    return { message: 'already save!!', status: 200, data }
  }
  
  // POST to Save User's comment to the Image (Token)
  async createComment(createCommentDto: CreateCommentDto) {
    const { nguoi_dung_id, hinh_id, noi_dung } = createCommentDto;

    const existingUser = await this.prisma.nguoi_dung.findUnique({
      where: { nguoi_dung_id },
    });

    if (!existingUser) {
      return { message: "Người dùng không tồn tại", status: 404 }
    }

    const existingImage = await this.prisma.hinh_anh.findUnique({
      where: { hinh_id },
    });

    if (!existingImage) {
      return { message: "Hình ko tồn tại", status: 404 }
    }

    return this.prisma.binh_luan.create({
      data: {
        nguoi_dung_id,
        hinh_id,
        ngay_binh_luan: new Date(),
        noi_dung,
      },
    });
  }

  // GET User Information (Token)
  async findAll() {
    try {
      let data = await this.prisma.nguoi_dung.findMany()
      return { message: 'Complete!', status: 200, data };
    } catch (error) {
      console.log(error);
      return { message: 'Error Service', status: 404 }
    }
  }

  // PUT User Personal Information (Token)
  async putInfo(data, user) {
    const updatedUser = await this.prisma.nguoi_dung.update({
      where: {
        nguoi_dung_id: user.data.nguoi_dung_id,
      },
      data: {
        ...data
      },
    });
    return updatedUser;
  }


}
