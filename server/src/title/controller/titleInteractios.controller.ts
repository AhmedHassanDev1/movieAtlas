import { Controller, Put, Delete, Param, ParseUUIDPipe, Body, Post } from "@nestjs/common";
import { RatingRequestDTO } from "src/interaction/dto/rating.dto";
import { ReviewBodyDTO } from "src/interaction/dto/review-response.dto";

import { RatingService } from 'src/interaction/service/rating.service';
import { ReviewService } from "src/interaction/service/review.service";
import { WatchedService } from "src/interaction/service/watched.service";
import { WatchListService } from "src/interaction/service/watchlist.service";
import { User } from "src/shared/decorators/user.decorator";

@Controller("title")
export class TitleInteractiosController {
    constructor(
        private readonly ratingService: RatingService,
        private readonly watchListService: WatchListService,
        private readonly watchHistory: WatchedService,
        private readonly reviewService: ReviewService,
     
    ) { }

    @Put("/:id/rating")
    async addRating(
        @User("id") userId: string,
        @Param("id", new ParseUUIDPipe({ version: '4' })) titleId: string,
        @Body() { value }: RatingRequestDTO
    ) {

        return await this.ratingService.addRating(userId, titleId, value)
    }

    @Delete("/:id/rating")
    async removeRating(
        @User("id") userId: string,
        @Param("id", new ParseUUIDPipe({ version: '4' })) titleId: string,
    ) {
        await this.ratingService.removeRating(userId, titleId)
    }

    @Put("/:id/watchlist")
    async addToWatchlist(
        @User("id") userId: string,
        @Param("id", new ParseUUIDPipe({ version: '4' })) titleId: string,

    ) {
        await this.watchListService.addToWatchList(userId, titleId)
    }

    @Delete("/:id/watchlist")
    async removeFromWatchlist(
        @User("id") userId: string,
        @Param("id", new ParseUUIDPipe({ version: '4' })) titleId: string,

    ) {
        await this.watchListService.removeFromWatchList(userId, titleId)
    }


    @Put("/:id/watched")
    async watched(
        @User("id") userId: string,
        @Param("id", new ParseUUIDPipe({ version: '4' })) titleId: string,

    ) {
        return await this.watchHistory.setWatched(userId, titleId)
    }

    @Delete("/:id/watched")
    async unWatched(
        @User("id") userId: string,
        @Param("id", new ParseUUIDPipe({ version: '4' })) titleId: string,

    ) {
        await this.watchHistory.unWatched(userId, titleId)
    }

    @Put("/:id/review")
    async addReview(
        @User("id") userId: string,
        @Param("id", new ParseUUIDPipe({ version: '4' })) titleId: string,
        @Body() { content }: ReviewBodyDTO
    ) {
        return await this.reviewService.addReview(userId, titleId, content)
    }

    @Delete("/:id/review/:reviewId")
    async deleteReview(
        @User("id") userId: string,
        @Param("reviewId", new ParseUUIDPipe({ version: '4' })) reviewId: string,
    ) {
        return await this.reviewService.removeReview(userId, reviewId)
    }


}