import { Controller, Post, UseGuards, UploadedFiles, UseInterceptors, Body, Req } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { v4 as uuidv4 } from 'uuid';

function filenameCallback(req, file, cb) {
  const name = `${Date.now()}-${uuidv4()}${extname(file.originalname)}`;
  cb(null, name);
}

@Controller('api/admin/products')
export class AdminProductsController {
  constructor(private readonly service: ProductsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({ destination: './uploads', filename: filenameCallback }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only images allowed'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(@UploadedFiles() files: Express.Multer.File[], @Body() body: any, @Req() req: any) {
    const images = (files || []).map((f, i) => ({ filename: f.filename, url: `/uploads/${f.filename}`, orderIndex: i }));
    const product = {
      title: body.title,
      description: body.description,
      price: body.price,
      images,
    };
    return this.service.create(product as any);
  }
}
