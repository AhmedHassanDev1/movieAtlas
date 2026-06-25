import { Module } from '@nestjs/common';
import { RatingService } from './service/rating.service';
import { InteractionController } from './controller/interaction.controller';
import { ReviewService } from './service/review.service';
import { WatchedService } from './service/watched.service';
import { WatchListService } from './service/watchlist.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { InteractionsService } from './service/Interactions.service';
import { IntersetService } from './service/inerest.service';
import { InterestController } from './controller/interset.controller';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
const providers = [
  RatingService,
  ReviewService,
  WatchedService,
  WatchListService,
  InteractionsService,
  IntersetService,
]
@Module({
  controllers: [InteractionController,InterestController],
  providers: [
    ...providers,
    PrismaService,
    PaginationHelper
  ],
  exports: [...providers]
})
export class InteractionModule { }
