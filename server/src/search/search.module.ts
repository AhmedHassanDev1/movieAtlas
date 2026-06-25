import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
@Module({
  controllers: [SearchController],
  providers: [SearchService,PrismaService,PaginationHelper],
})
export class SearchModule {}
