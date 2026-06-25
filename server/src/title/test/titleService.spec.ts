import { Test, TestingModule } from '@nestjs/testing';
import { TitleService } from '../title.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';
import { NotFoundException } from '@nestjs/common';

describe('TitleService', () => {

    let service: TitleService;

    const mockPrisma = {

        title: {
            findUnique: jest.fn(),
            upsert: jest.fn(),
        },

        titleGenre: {
            findMany: jest.fn(),
        },

        credit: {
            findMany: jest.fn(),
            count: jest.fn(),
        },

        titleImage: {
            findMany: jest.fn(),
            count: jest.fn(),
        },

        titleVideo: {
            findMany: jest.fn(),
            count: jest.fn(),
        },

        review: {
            findMany: jest.fn(),
            count: jest.fn(),
        }

    };

    const mockPagination = {

        buildMeta: jest.fn(),

    };

    beforeEach(async () => {

        jest.clearAllMocks();

        const module: TestingModule =
            await Test.createTestingModule({

                providers: [

                    TitleService,

                    {
                        provide: PrismaService,
                        useValue: mockPrisma,
                    },

                    {
                        provide: PaginationHelper,
                        useValue: mockPagination,
                    },

                ],

            }).compile();

        service = module.get<TitleService>(TitleService);

    });
    it('should return title', async () => {

        mockPrisma.title.findUnique.mockResolvedValue({

            id: '1',

            name: 'Breaking Bad'

        });

        const result = await service.getTitleById('1');

        expect(result?.id).toBe('1');

        expect(mockPrisma.title.findUnique)

            .toHaveBeenCalledWith({

                where: {

                    id: '1'

                }

            });

    });

    it('should throw NotFoundException', async () => {

        mockPrisma.title.findUnique

            .mockResolvedValue(null);

        await expect(

            service.getTitleById('1')

        ).rejects.toThrow(

            NotFoundException

        );

    });


    it('should return genres', async () => {

        mockPrisma.titleGenre.findMany

            .mockResolvedValue([

                {

                    genre: {

                        id: 1,

                        name: 'Drama'

                    }

                }

            ]);

        const result =

            await service.getTitleGenres('1');

        expect(result).toHaveLength(1);

        expect(mockPrisma.titleGenre.findMany)

            .toHaveBeenCalled();

    });


    it('should get credits with job filter', async () => {

        mockPrisma.credit.findMany

            .mockResolvedValue([]);

        mockPrisma.credit.count

            .mockResolvedValue(0);

        mockPagination.buildMeta

            .mockReturnValue({

                total: 0

            });

        await service.getTitleCredits(

            'title-id',

            'Actor',

            1,

            20

        );

        expect(

            mockPrisma.credit.findMany

        ).toHaveBeenCalledWith(

            expect.objectContaining({

                where: {

                    title_id: 'title-id',

                    job: {

                        equals: 'Actor',

                        mode: 'insensitive'

                    }

                }

            })

        );

    });

it('should upsert title', async () => {

  mockPrisma.title.upsert

    .mockResolvedValue({

      id: '1'

    });

  const mapped = {

    tmdb_id: 10,

    media_type: 'movie',

    genre_ids: [1,2],

    name: 'Avatar'

  };

  const result =

    await service.upsertTitle(mapped);

  expect(result.id)

    .toBe('1');

  expect(

    mockPrisma.title.upsert

  )

  .toHaveBeenCalled();

});

it('should return paginated images', async () => {

  mockPrisma.titleImage.findMany

    .mockResolvedValue([

      {

        id: 'img1'

      }

    ]);

  mockPrisma.titleImage.count

    .mockResolvedValue(1);

  mockPagination.buildMeta

    .mockReturnValue({

      total: 1

    });

  const result =

    await service.getTitleImages(

      '1',

      1,

      20

    );

  expect(result.data)

    .toHaveLength(1);

  expect(result.meta)

    .toEqual({

      total: 1

    });

});

});