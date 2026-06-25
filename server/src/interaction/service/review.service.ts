
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ReviewService {
    constructor(
        private readonly Repo: PrismaService
    ) { }


    async addReview(userId: string, titleId: string, content: string) {
        const user = await this.Repo.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                avatar: {
                    select: {
                        url: true
                    }
                }
            }
        })
        const existing = await this.Repo.review.findFirst({
            where: {
                user_id: userId,
                title_id: titleId
            },

        })

        if (existing) {
            return this.Repo.review.update({
                where: { id: existing.id },
                data: { content }
            });
        }
        const review = await this.Repo.review.create({
            data: {
                user_id: userId,
                title_id: titleId,
                content,
                source: "Local",
                name: user?.user_name,
                avatar_path: user?.avatar?.url
            }
        })
        return review
    }

    async removeReview(userId: string, reviewId: string,) {

        const deleted = await this.Repo.review.deleteMany({
            where: {
                id: reviewId,
                user_id: userId
            }
        });
        return deleted
    }

}
