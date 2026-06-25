import { Controller, Get, Param, ParseUUIDPipe,  Query } from '@nestjs/common';
import { TitleService } from '../title.service';
import { Public } from 'src/shared/decorators/publicRoute.decorator';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Public()
@Controller('title')
export class TitleController {
  constructor(
    private readonly titleService: TitleService,

  ) { }



  @Get("/:id")
  async getTitleById(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return await this.titleService.getTitleById(id)
  }

  @Get("/:id/view")
  async getTitleView(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    const details = await this.titleService.getTitleById(id)
    const actors = await this.titleService.getTitleCredits(id, "Actor", 1, 3)
    const directors = await this.titleService.getTitleCredits(id, "director", 1, 2)
    const genres = await this.titleService.getTitleGenres(id)
    return {
      details,
      actors: actors.data,
      directors: directors.data,
      genres
    }

  }
  
  @Get("/:id/genres")
  async getTitleGenres(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return await this.titleService.getTitleGenres(id)
  }
  
  @Get("/:id/credit")
  async getTitleCredits(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Query("job") job: string,

    @Query("page") page = 1,

    @Query("limit") limit = 20,

    @Query("orderBy") orderBy: "job" | "created_at" = "job",

    @Query("order") order: "asc" | "desc" = "asc",

  ) {
    return await this.titleService.getTitleCredits(id, job, page, limit, orderBy, order)
  }

@Get("/:id/Similar")
  async getTitlesSimilar(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Query("page") page = 1,
    @Query("limit") limit = 20,
  ) {
    return await this.titleService.getSimilar(id, page, limit)
  }


  @Get("/:id/images")
  async getTitleImages(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Query("page") page = 1,
    @Query("limit") limit = 20,
  ) {
    return await this.titleService.getTitleImages(id, page, limit)
  } 



  @Get("/:id/videos")
  async getTitleVideos(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Query("page") page = 1,
    @Query("limit") limit = 20,
  ) {
    return await this.titleService.getTitleVidoes(id, page, limit)
  }



  @Get("/:id/reviews")
  async getTitleReviews(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Query("page") page = 1,
    @Query("limit") limit = 20,
  ) {
    return await this.titleService.getTitleReviews(id, page, limit)
  }

 
}
