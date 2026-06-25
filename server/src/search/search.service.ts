import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DTOMapper } from 'src/shared/helpers/mapper';
import { PrismaService } from 'src/shared/services/prisma.service';

import { SearchResultResponeDTO } from './dto/search-response.dto';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';

@Injectable()
export class SearchService {
    constructor(
        private readonly Repo: PrismaService,
        private readonly paginationHelper: PaginationHelper
    ) { }

    async getTitleByName(q: string, page: number, limit: number) {

        const limitValue = Number(limit) || 10
        const pageValue = Number(page) || 1
        const offset = Number(pageValue - 1) * limitValue

        const searchValue = q
            .replace(/[^\w\s]/g, " ")
            .trim()
            .split(/\s+/)
            .join(" | ")
        const [titles, count] = await Promise.all([
            this.Repo.$queryRaw<SearchResultResponeDTO[]>(
                Prisma.sql`
                          SELECT *,
                        ts_rank(
                            to_tsvector(
                            'english',
                            coalesce(title,'') || ' ' || coalesce(overview,'')
                            ),
                            plainto_tsquery(
                            'english',
                            ${searchValue}
                            )
                        ) as rank

                    FROM "Title"

                    WHERE
                    to_tsvector(
                        'english',
                        coalesce(title,'') || ' ' || coalesce(overview,'')
                    )
                    @@plainto_tsquery('english',  ${searchValue} )

                    ORDER BY rank DESC
                    LIMIT ${limitValue}
                    OFFSET ${offset}`),

            this.Repo.$queryRaw<{ count: number }[]>(
                Prisma.sql`
                            SELECT COUNT(*) as count
                            FROM "Title"
                            WHERE

                            to_tsvector(
                            'english',
                            coalesce(title,'') || ' ' || coalesce(overview,'')
                            )
                            @@
                            plainto_tsquery(
                            'english',
                            ${searchValue}
                            )
                            
                            `)
        ])

        return {
            data: titles.map(el => DTOMapper.toResponse(el, SearchResultResponeDTO)),
            meta: this.paginationHelper.buildMeta(Number(count[0].count), pageValue, limitValue)
        }
    }
}
