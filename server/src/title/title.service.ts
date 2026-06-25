import { Injectable, NotFoundException } from '@nestjs/common';
import { DTOMapper } from 'src/shared/helpers/mapper';
import { PrismaService } from 'src/shared/services/prisma.service';
import { ImageAssetDTO, TitleEntity, TitleSimilarReponseDTO, VideoAssetDTO } from './dto/Title-response.dto';
import { GenresResponseDTO } from './dto/Genres-response.dto';
import { MediaType, Prisma } from '@prisma/client';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
import { ReviewResponseDTO } from 'src/interaction/dto/review-response.dto';
import { Public } from 'src/shared/decorators/publicRoute.decorator';


@Public()
@Injectable()
export class TitleService {
    constructor(
        private readonly Repo: PrismaService,
        private readonly paginationHelper: PaginationHelper
    ) { }

    async getTitleById(id: string) {
        let title = await this.Repo.title.findUnique({ where: { id } })
        if (!title) throw new NotFoundException("not found this content.")
        return DTOMapper.toResponse(title, TitleEntity);
    }

    async getTitleGenres(id: string) {
        const genres = await this.Repo.titleGenre.findMany({
            where: {
                title_id: id,
            },
            select: {
                genre: true
            }
        })
        return genres.map(el => DTOMapper.toResponse(el.genre, GenresResponseDTO))

    }
    private calculateSimilarityScore(
        candidates: any[],
        title: {
            original_language: string | null
            media_type: MediaType
            collectionId: string | null
            genres: { genre_id: number }[]
        }
    ) {
        const genreIds = new Set(
            title.genres.map(g => g.genre_id)
        )

        return candidates.map(item => {
            let score = 0

            const commonGenres =
                item.genres.filter(g =>
                    genreIds.has(g.genre_id)
                ).length

            score += commonGenres * 10

            if (
                title.collectionId &&
                item.collectionId === title.collectionId
            ) {
                score += 50
            }

            if (
                item.original_language ===
                title.original_language
            ) {
                score += 5
            }

            if (
                item.media_type ===
                title.media_type
            ) {
                score += 5
            }

            score += item.popularity / 100

            return {
                ...item,
                commonGenres,
                score
            }
        })
    }
    private async getSimilarCandidates(
        id: string,
        title: {
            title: string
            original_language: string | null
            media_type: MediaType
            collectionId: string | null
            genres: { genre_id: number }[]
        },
        take: number,
        offset: number
    ) {
        const searchQuery = title.title
            .replace(/[^\w\s]/g, " ")
            .trim()
            .split(/\s+/)
            .join(" | ")

        return this.Repo.title.findMany({
            where: {
                NOT: { id },
                OR: [
                    { collectionId: title.collectionId },
                    { media_type: title.media_type },
                    { original_language: title.original_language },
                    {
                        genres: {
                            some: {
                                genre_id: {
                                    in: title.genres.map(
                                        g => g.genre_id
                                    )
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                genres: true
            },
            orderBy: [
                {
                    _relevance: {
                        fields: ["title"],
                        search: searchQuery,
                        sort: "desc",
                    }
                },
                {
                    vote_average: "desc"
                }
            ],
            take,
            skip: offset
        })
    }
    async getSimilar(
        id: string,
        page: number = 1,
        limit: number = 20,
    ) {
        const take = Number(limit)
        const offset = (Number(page) - 1) * take

        const title = await this.Repo.title.findUnique({
            where: { id },
            select: {
                original_language: true,
                media_type: true,
                title: true,
                collectionId: true,
                genres: true
            }
        })

        if (!title) {
            throw new NotFoundException(
                "not found this content."
            )
        }

        const candidates = await this.getSimilarCandidates(
            id,
            title,
            take,
            offset
        )
        const similar = this.calculateSimilarityScore(
            candidates,
            title
        )
        return similar.map(el => DTOMapper.toResponse(el, TitleSimilarReponseDTO))
    }


    async getTitleCredits(
        id: string,
        job?: string,
        page: number = 1,
        limit: number = 20,
        orderBy: "job" | "created_at" = "job",
        order: "asc" | "desc" = "asc"
    ) {
        const where: Prisma.CreditWhereInput = {
            title_id: id,
        };

        if (job?.trim()) {
            where.job = {
                equals: job.trim(),
                mode: "insensitive",
            };
        }

        const skip = (page - 1) * limit;

        const [credits, total] = await Promise.all([
            this.Repo.credit.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: {
                    [orderBy]: order,
                },
                select: {
                    job: true,
                    person: {
                        select: {
                            id: true,
                            name: true,
                            profile_path: true,
                        },
                    },
                },
            }),

            this.Repo.credit.count({ where }),
        ]);
        return {
            data: credits,
            meta: this.paginationHelper.buildMeta(total, page, limit)
        };
    }

    async upsertTitle(mapped) {
        const { genre_ids, ...data } = mapped;

        const title = await this.Repo.title.upsert({
            where: {
                tmdb_id_media_type: {
                    tmdb_id: data.tmdb_id,
                    media_type: data.media_type,
                },
            },
            create: data,
            update: data,
        });

        return title;
    }

    async getTitleImages(
        id: string,
        page: number = 1,
        limit: number = 20,
    ) {
        const where: Prisma.TitleImageWhereInput = {
            title_id: id,
        };

        const skip = (page - 1) * limit;
        const [images, total] = await Promise.all([
            this.Repo.titleImage.findMany({
                where,
                skip,
                take: Number(limit),
            }),
            this.Repo.titleImage.count({ where }),
        ]);
        return {
            data: images.map(el => DTOMapper.toResponse(el, ImageAssetDTO)),
            meta: this.paginationHelper.buildMeta(total, page, limit)
        };
    }

    async getTitleVidoes(
        id: string,
        page: number = 1,
        limit: number = 20,
    ) {
        const where: Prisma.TitleVideoWhereInput = {
            title_id: id,
        };

        const skip = (page - 1) * limit;
        const [videos, total] = await Promise.all([
            this.Repo.titleVideo.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: {
                    ["published_at"]: "desc"
                }
            }),
            this.Repo.titleVideo.count({ where }),
        ]);
        return {
            data: videos.map(el => DTOMapper.toResponse(el, VideoAssetDTO)),
            meta: this.paginationHelper.buildMeta(total, page, limit)
        };
    }

    async getTitleReviews(
        id: string,
        page: number = 1,
        limit: number = 20,
    ) {
        const where: Prisma.ReviewWhereInput = {
            title_id: id,
        };

        const skip = (page - 1) * limit;
        const [videos, total] = await Promise.all([
            this.Repo.review.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: {
                    ["createdAt"]: "desc"
                }
            }),
            this.Repo.review.count({ where }),
        ]);
        return {
            data: videos.map(el => DTOMapper.toResponse(el, ReviewResponseDTO)),
            meta: this.paginationHelper.buildMeta(total, page, limit)
        };
    }
}   
