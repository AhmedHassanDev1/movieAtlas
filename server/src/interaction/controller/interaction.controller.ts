import { Controller, Get, Param, ParseUUIDPipe  } from '@nestjs/common';
import { InteractionsService } from '../service/Interactions.service';
import { User } from 'src/shared/decorators/user.decorator';

import { SkipThrottle } from '@nestjs/throttler';
import { Public } from 'src/shared/decorators/publicRoute.decorator';


@SkipThrottle()
@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionsService) { }



  @Get("/:id/stat")
  async getTitleStat(
    @User("id") userId: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) titleId: string
  ) {
    return await this.interactionService.getTitleStat(userId,titleId)
  }
  
  @Public()
  @Get("/:id/user")
  async getUserStat(
    @Param("id", new ParseUUIDPipe({ version: "4" })) userId: string
  ) {
    return await this.interactionService.getUserStat(userId)
  }

}
