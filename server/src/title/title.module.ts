import { Module } from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './controller/title.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
import { InteractionModule } from 'src/interaction/interaction.module';
import { TitleInteractiosController } from './controller/titleInteractios.controller';

@Module({
  imports:[InteractionModule],
  controllers: [TitleController,TitleInteractiosController],
  providers: [
    TitleService,
    PrismaService,
    PaginationHelper
  ],
  exports:[TitleService]
})
export class TitleModule {}
