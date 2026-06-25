import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
import { DTOMapper } from 'src/shared/helpers/mapper';
import { TitleEntity } from 'src/title/dto/Title-response.dto';

@Injectable()
export class RatingService {
  constructor(
    private readonly Repo: PrismaService,
    private readonly paginationHelper: PaginationHelper,
  ) {}

  async addRating(userId: string, titleId: string, value: number) {
    return this.Repo.rating.upsert({
      where: {
        user_id_title_id: {
          user_id: userId,
          title_id: titleId,
        },
      },
      update: { value },
      create: {
        user_id: userId,
        title_id: titleId,
        value,
      },
    });
  }

  async removeRating(userId: string, titleId: string) {
    return this.Repo.rating.delete({
      where: {
        user_id_title_id: {
          user_id: userId,
          title_id: titleId,
        },
      },
    });
  }

  async getUserRating(userId: string, page = 1, limit = 20) {
    const take = limit ? Number(limit) : 20;
    const pageNum = page ? Number(page) : 1;
    const skip = (pageNum - 1) * take;

    const where = { user_id: userId };

    const [data, total] = await Promise.all([
      this.Repo.rating.findMany({
        where,
        select: {
          title: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take,
        skip,
      }),
      this.Repo.rating.count({ where }),
    ]);

    return {
      data: data.map((el) =>
        DTOMapper.toResponse(el.title, TitleEntity),
      ),
      meta: this.paginationHelper.buildMeta(
        total,
        pageNum,
        take,
      ),
    };
  }
}