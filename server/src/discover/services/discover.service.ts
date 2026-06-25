import { Injectable } from '@nestjs/common';
import { DiscoverType, Prisma } from '@prisma/client';
import { DTOMapper } from 'src/shared/helpers/mapper';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TitleEntity } from 'src/title/dto/Title-response.dto';
import { FilterType } from '../types/discover';
import { TitleWhereInput } from 'generated/prisma/models';

@Injectable()
export class DiscoverService {
    constructor(
        private readonly repo: PrismaService,
        private readonly paginationHelper: PaginationHelper,
    ) { }

    async getMovieList(
        type: DiscoverType,
        page: number = 1,
        limit: number = 20,
    ) {
        const where: Prisma.DiscoverItemWhereInput = { type };
        const skip = (Number(page) - 1) * Number(limit);

        const [items, total] = await Promise.all([
            this.repo.discoverItem.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: {
                    rank: "asc",
                },
                include: {
                    title: true,
                },
            }),
            this.repo.discoverItem.count({ where }),
        ]);

        return {
            data: items.map((item) => ({
                rank: item.rank,
                title: DTOMapper.toResponse(item.title, TitleEntity),
            })),
            meta: this.paginationHelper.buildMeta(total, Number(page), Number(limit)),
        };
    }

    private getOrderBy(sortBy?: string): Prisma.TitleOrderByWithRelationInput {
        switch (sortBy) {
            case "popularity.desc":
                return { popularity: "desc" };

            case "popularity.asc":
                return { popularity: "asc" };

            case "rating.desc":
                return { vote_average: "desc" };

            case "rating.asc":
                return { vote_average: "asc" };

            case "releaseDate.desc":
                return { release_date: "desc" };

            case "releaseDate.asc":
                return { release_date: "asc" };

            default:
                return { popularity: "desc" };
        }
    }
    async getTitles({
        type,
        genreIds,
        sortBy,
        minRating,
        page,
        limit
    }: FilterType) {
        let where: TitleWhereInput = {}


        where = {
            ...(type && {
                media_type: type === "movie"
                    ? "Movie"
                    : "TV"
            }),
            ...(genreIds?.length && {
                genres: {
                    some: {
                        genre: {
                            tmdb_id: {
                                in: genreIds,
                            },
                        },
                    },
                },
            }),
            ...(minRating && {
                vote_average: {
                    gte: minRating,
                },
            })
        }


        let [titles, total] = await Promise.all([
            await this.repo.title.findMany({

                where,
                orderBy: this.getOrderBy(sortBy),

                skip: (Number(page) - 1) * Number(limit),

                take: Number(limit),

                include: {
                    genres: true,
                },

            }),
            this.repo.title.count({ where })
        ])
        return {
            data: titles.map(el => DTOMapper.toResponse(el, TitleEntity)),
            meta: this.paginationHelper.buildMeta(total, Number(page), Number(limit)),
        }
    }

async getGenres(genreId?: number, page = 1, limit = 20) {
  const data = await this.repo.genre.findMany({
    where: genreId !== undefined
      ? { tmdb_id: genreId }
      : undefined,

    take: Number(limit),
    skip: (Number(page) - 1) * Number(limit),

    orderBy: {
      tmdb_id: "asc",
    },

    include: {
      titleGenres: {
        take: 5, 
        orderBy: {
          title: {
            popularity: "desc",
          },
        },
        include: {
          title: {
            select: {
              backdrop_path: true,
              poster_path: true,
            },
          },
        },
      },
    },
  });

  const genres = data.map((genre) => {
    const bestTitle = genre.titleGenres.find(
      (tg) => tg.title?.poster_path || tg.title?.backdrop_path
    );

    return {
      id: genre.id,
      name: genre.name,
      tmdb_id: genre.tmdb_id,
      image:
        bestTitle?.title?.poster_path ||
        bestTitle?.title?.backdrop_path ||
        null,
    };
  });

  return {
    data: genres,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total: data.length,
    },
  };
}

}
