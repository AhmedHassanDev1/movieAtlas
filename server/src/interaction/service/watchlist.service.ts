import { Injectable } from '@nestjs/common';
import { DTOMapper } from 'src/shared/helpers/mapper';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TitleEntity } from 'src/title/dto/Title-response.dto';

@Injectable()
export class WatchListService {
    constructor(
        private readonly Repo: PrismaService,
        private readonly paginationHelper: PaginationHelper,

    ) { }

async addToWatchList(userId: string, titleId: string) {
  return this.Repo.watchlist.upsert({
    where: {
      user_id_title_id: {
        user_id: userId,
        title_id: titleId,
      },
    },
    update: {},
    create: {
      user_id: userId,
      title_id: titleId,
    },
  });
}


    async removeFromWatchList(userId: string, titleId: string) {
        const deleted = await this.Repo.watchlist.delete({
            where: {
                user_id_title_id: {
                    user_id: userId,
                    title_id: titleId
                },
            }
        })
        return deleted;
    }


    async getUserWatchList(
        userId: string,
        page = 1,
        limit = 20
    ) {
        const where = {
            user_id: userId
        }

        const [data, total] = await Promise.all([
            this.Repo.watchlist.findMany({
                where,
                select: {
                    title: true
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: Number(limit),
                skip: (Number(page) - 1) * Number(limit),
            }),
            this.Repo.watchlist.count({ where })
        ])

        return {
            data: data.map(el => DTOMapper.toResponse(el.title, TitleEntity)),
            meta: this.paginationHelper.buildMeta(total, page, limit)
        }
    }
}
