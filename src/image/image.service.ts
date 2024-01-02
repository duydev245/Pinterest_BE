import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ImageService {

    prisma = new PrismaClient();

    // GET Image List
    async findAll() {
        let data = await this.prisma.hinh_anh.findMany();

        return {message:'Complete!', status: 200, data};
    }

    // GET Image Searching by image_name
    async findName(iName) {
        let data = await this.prisma.hinh_anh.findMany({
            where: {
                ten_hinh: {
                    contains: iName
                }
            }
        });

        return {message:'Complete!', status: 200, data};
    }

    // GET Created Image List by user_id (Token)
    async findImgCreId(userId: number) {
        let data = await this.prisma.hinh_anh.findMany({
            where: {
                nguoi_dung_id: userId
            }
        });

        return {message:'Complete!', status: 200, data};
    }

    // GET GET Saved Image List by user_id (Token)
    async findImgSavId(userId: number) {
        let data = await this.prisma.luu_anh.findMany({
            where: {
                nguoi_dung_id: userId
            }
        });

        return {message:'Complete!', status: 200, data};
    }

    // DELETE Delete Image by image_id (Token)
    async delImgCre(ImgId: number) {
        let data = await this.prisma.hinh_anh.delete({
            where: {
                hinh_id: ImgId
            }
        })

        return {message:'Complete!', status: 200, data};
    }

}
