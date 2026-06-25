
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/services/prisma.service';


@Injectable()
export class InteractionsService {
    constructor(
        private readonly Repo: PrismaService
    ) { }

    async getUserStat(userId: string) {
        const where = { user_id: userId }
        const [
            rating_count,
            reviews_count,
            watchlist_count,
            watched_count,
            interests_count
        ] = await Promise.all([
            this.Repo.rating.count({ where }),
            this.Repo.review.count({ where }),
            this.Repo.watchlist.count({ where }),
            this.Repo.watched.count({ where }),
            this.Repo.userInterest.count({ where }),
        ])
        return {
            rating_count,
            reviews_count,
            watchlist_count,
            watched_count,
            interests_count
        }
    }

    async getTitleStat(userId: string, titleId: string) {
        const where = {
            user_id: userId,
            title_id: titleId
        }
        const watched = await this.Repo.watched.findFirst({ where })
        const rating = await this.Repo.rating.findFirst({ where })
        const watchlist = await this.Repo.watchlist.findFirst({ where })
        return {
            watched: !!watched,
            watchlist: !!watchlist,
            rating: rating?.value || 0
        }
    }
}
