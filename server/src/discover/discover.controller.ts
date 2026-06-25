import { BadRequestException, Controller, Get, Param, ParseFloatPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { DiscoverType } from '@prisma/client';
import { Public } from 'src/shared/decorators/publicRoute.decorator';
import { DiscoverService } from './services/discover.service';
import { ACTIVE_MOVIE_DISCOVER_TYPES, DiscoverAsyncService } from './services/DiscoverSync.service';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

type DiscoverListParam = "trending" | "popular" | "top-rated" | "now-playing" | "upcoming";

const DISCOVER_ROUTE_TYPES: Record<DiscoverListParam, DiscoverType> = {
  "trending": DiscoverType.TRENDING,
  "popular": DiscoverType.POPULAR,
  "top-rated": DiscoverType.TOP_RATED,
  "now-playing": DiscoverType.NOW_PLAYING,
  "upcoming": DiscoverType.UPCOMING,
};

@Controller('discover')
export class DiscoverController {
  constructor(
    private readonly discoverService: DiscoverService,
    private readonly async: DiscoverAsyncService,

  ) { }

  @Public()
  @Get("/titles")
   @ApiOperation({
    summary: 'Get movies or TV shows',
    description: 'Retrieve a paginated list of titles with filters.'
  })

  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['movie', 'tv'],
    example: 'movie',
  })

  @ApiQuery({
    name: 'genreIds',
    required: false,
    type: String,
    description: 'Comma separated genre ids',
    example: '28,12,16',
  })

  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: [
      'popularity.desc',
      'popularity.asc',
      'rating.desc',
      'rating.asc',
      'releaseDate.desc',
      'releaseDate.asc',
    ],
    example: 'popularity.desc',
  })

  @ApiQuery({
    name: 'minRating',
    required: false,
    type: Number,
    example: 7.5,
  })

  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
  })

  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 20,
  })

  @ApiOkResponse({
    description: 'Titles retrieved successfully',
    // type: DiscoverResponseDto
  })
  async getTitleList(

    @Query("type") type?: "movie" | "tv",

    @Query("genreIds") genreIds?: string,

    @Query("sortBy")
    sortBy?: "popularity.desc" | "popularity.asc"
      | "rating.desc" | "rating.asc"
      | "releaseDate.desc" | "releaseDate.asc",

    @Query("minRating", new ParseFloatPipe({ optional: true }))
    minRating?: number,

    @Query("page", new ParseIntPipe({ optional: true }))
    page = 1,

    @Query("limit", new ParseIntPipe({ optional: true }))
    limit = 20,
  ) {
    const genres = genreIds
      ? genreIds.split(",").map(Number)
      : [];

    return await this.discoverService.getTitles({
      type,
      genreIds: genres,
      sortBy,
      minRating,
      page,
      limit,
    });
  }


  @Public()
  @Get("/genres")
  async discoverGenres(
    @Query("page") page = 1,
    @Query("limit") limit = 20,
    @Query("genreId") genreId: number
  ) {
    return await this.discoverService.getGenres(genreId, page, limit)
  }

  @Public()
  @Get("/:list")
  async getMovieList(
    @Param("list") list: DiscoverListParam,
    @Query("page") page = 1,
    @Query("limit") limit = 20,
  ) {
    const type = DISCOVER_ROUTE_TYPES[list];
    if (!type) throw new BadRequestException("Unsupported discover list.");

    return this.discoverService.getMovieList(type, Number(page), Number(limit));
  }

  @Post("/sync")
  async syncMovieLists() {
    return this.async.syncMovieDiscoverLists();
  }

  @Post("/sync/:list")
  async syncMovieList(@Param("list") list: DiscoverListParam) {
    const type = DISCOVER_ROUTE_TYPES[list];
    if (!type || !ACTIVE_MOVIE_DISCOVER_TYPES.includes(type)) {
      throw new BadRequestException("Unsupported discover list.");
    }

    return this.async.syncMovieList(type);
  }


}
