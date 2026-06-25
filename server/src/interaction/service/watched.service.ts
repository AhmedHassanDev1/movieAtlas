import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';


@Injectable()
export class WatchedService {
  constructor(private readonly repo: PrismaService) {}

  async setWatched(userId: string, titleId: string) {
    return this.repo.watched.upsert({
      where: {
        user_id_title_id: {
          user_id: userId,
          title_id: titleId,
        },
      },
      create: {
        user_id: userId,
        title_id: titleId,
      },
      update: {}, // idempotent
    });
  }

  async unWatched(userId: string, titleId: string) {
    return this.repo.watched.delete({
      where: {
        user_id_title_id: {
          user_id: userId,
          title_id: titleId,
        },
      },
    });
  }

  async getUserWatched(userId: string, page = 1, limit = 20) {
    const take = Math.max(1, Number(limit) || 20);
    const pageNum = Math.max(1, Number(page) || 1);
    const skip = (pageNum - 1) * take;

    const where = {
      user_id: userId,
    };

    const [data, total] = await Promise.all([
      this.repo.watched.findMany({
        where,
        include: {
          title: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take,
        skip,
      }),
      this.repo.watched.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: pageNum,
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    };
  }
}