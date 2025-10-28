import {
  Controller,
  Post,
  Delete,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload')
@UseGuards(AuthGuard('jwt'))
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body('folder') folder?: string) {
    const result = await this.cloudinaryService.uploadImage(file, folder);
    return {
      url: result['secure_url'],
      publicId: result['public_id'],
    };
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('folder') folder?: string,
  ) {
    const results = await this.cloudinaryService.uploadMultipleImages(files, folder);
    return results.map((result) => ({
      url: result['secure_url'],
      publicId: result['public_id'],
    }));
  }

  @Delete('image')
  async deleteImage(@Body('publicId') publicId: string) {
    return this.cloudinaryService.deleteImage(publicId);
  }

  @Delete('images')
  async deleteImages(@Body('publicIds') publicIds: string[]) {
    return this.cloudinaryService.deleteMultipleImages(publicIds);
  }
}

