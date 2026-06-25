import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, ParseUUIDPipe, Patch, Put, Query, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"
import { UserService } from './user.service';
import { User } from 'src/shared/decorators/user.decorator';
import { EditeProfileDTO } from './dto/userEdite.dto';
import { memoryStorage } from 'multer';
import { RatingService } from 'src/interaction/service/rating.service';
import { Public } from 'src/shared/decorators/publicRoute.decorator';
import { WatchListService } from 'src/interaction/service/watchlist.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly ratingService: RatingService,
    private readonly watchListService: WatchListService,

  ) { }



  @Get("/me")
  async me(
    @User("id") userId: string,
  ) {
    return await this.userService.getUseById(userId)
  }

  @Patch("/me")
  async EditeProfile(
    @User("id") userId: string,
    @Body() body: EditeProfileDTO
  ) {
    return await this.userService.editProfile({ ...body, userId })
  }





  @Patch("/me/avatar")
  @UseInterceptors(FileInterceptor('avatar', {
    storage: memoryStorage(),

  }))
  async upadateAvatar(
    @User("id") userId: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
        new FileTypeValidator({ fileType: /image\/.*/ }),
      ]
    })) file: Express.Multer.File
  ) {
    return await this.userService.updateAvatar({ userId, fileBuffer: file.buffer })

  }

  @Public()
  @Get("/:id")
  async getProfile(
    @Param("id", new ParseUUIDPipe({ version: '4' })) userId: string

  ) {
    return await this.userService.getUseById(userId)
  }

  @Public()
  @Get("/:id/settings")
  async getUserSetting(
    @Param("id", new ParseUUIDPipe({ version: '4' })) userId: string
  ) {
    return await this.userService.getUserSettings(userId)
  }

  @Public()
  @Get("/:id/rating")
  async getUserRating(
    @Param("id", new ParseUUIDPipe({ version: '4' })) userId: string,

    @Query("page", new ParseIntPipe({ optional: true }))
    page = 1,

    @Query("limit", new ParseIntPipe({ optional: true }))
    limit = 20,
  ) {
    return this.ratingService.getUserRating(userId, page, limit)
  }

  @Get("/:id/reviews")
  async getUserReviews() {

  }

  @Public()
  @Get("/:id/watchlist")
  async getUserWatchList(
    @Param("id", new ParseUUIDPipe({ version: '4' })) userId: string,

    @Query("page", new ParseIntPipe({ optional: true }))
    page = 1,

    @Query("limit", new ParseIntPipe({ optional: true }))
    limit = 20,
  ) {
    return await this.watchListService.getUserWatchList(userId, page, limit)
  }



}
