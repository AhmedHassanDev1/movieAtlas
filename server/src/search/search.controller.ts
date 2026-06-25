import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Public } from 'src/shared/decorators/publicRoute.decorator';
import { SkipThrottle } from '@nestjs/throttler';
@SkipThrottle()
@Public()
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Get("titles")
  async SearchByTitleName(
    @Query("q") q: string,
    @Query("limit") limit: number,
    @Query("page") page: number
  ) {
    return await this.searchService.getTitleByName(q, page, limit)
  }

}
