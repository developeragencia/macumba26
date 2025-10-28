import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.blogService.findAll(page, limit);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug);
  }
}

