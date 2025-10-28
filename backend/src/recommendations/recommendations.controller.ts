import { Controller, Get, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecommendationsService } from './recommendations.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private recommendationsService: RecommendationsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getRecommendations(
    @CurrentUser() user: any,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.recommendationsService.getRecommendations(user.id, limit);
  }

  @Get('trending')
  async getTrendingProducts(@Query('limit', ParseIntPipe) limit: number = 10) {
    return this.recommendationsService.getTrendingProducts(limit);
  }
}

