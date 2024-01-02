import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Request } from '@nestjs/common';
import { ImageService } from './image.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('image')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private configService: ConfigService
  ) { }

  // API GET Image List
  // localhost:8080/image/get-image
  @Get('get-image')
  findAll() {
    try {
      return this.imageService.findAll();
    } catch (error) {
      console.log(error);
      return { message: 'Error', status: HttpStatus.BAD_REQUEST }
    }
  }

  // API GET Image Searching by image_name
  // localhost:8080/image/:iName
  @Get(':iName')
  findName(@Param('iName') iName) {
    try {
      return this.imageService.findName(iName);
    } catch (error) {
      console.log(error);
      return { message: 'Error', status: HttpStatus.BAD_REQUEST }
    }
  }

  // API GET Created Image List by user_id (Token)
  // localhost:8080/image/search/img-created/:userId
  @UseGuards(JwtAuthGuard)
  @Get('search/img-created/:userId')
  findImgCreId(@Param('userId') userId: number) {
    try {
      return this.imageService.findImgCreId(+userId);
    } catch (error) {
      console.log(error);
      return { message: 'Error', status: HttpStatus.BAD_REQUEST }
    }
  }

  // API GET Saved Image List by user_id (Token)
  // localhost:8080/image/search/img-saved/:userId
  @UseGuards(JwtAuthGuard)
  @Get('search/img-saved/:userId')
  findImgSavId(@Param('userId') userId: number) {
    try {
      return this.imageService.findImgSavId(+userId);
    } catch (error) {
      console.log(error);
      return { message: 'Error', status: HttpStatus.BAD_REQUEST }
    }
  }

  // API DELETE Delete Image by image_id (Token)
  // localhost:8080/image/delete/img-created/:ImgId
  @UseGuards(JwtAuthGuard)
  @Delete('delete/img-created/:ImgId')
  delImgCre(@Param('ImgId') ImgId: number) {
    try {
      return this.imageService.delImgCre(+ImgId);
    } catch (error) {
      console.log(error);
      return { message: 'Error', status: HttpStatus.BAD_REQUEST }
    }
  }

}
