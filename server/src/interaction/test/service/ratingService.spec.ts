import { Test, TestingModule } from '@nestjs/testing';
import { RatingService } from '../../service/rating.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';

describe('RatingService', () => {

    let service: RatingService;

    const mockPrisma = {
        rating: {
            upsert: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn(),
            count: jest.fn(),
        },
    };

    const mockPaginationHelper = {
        buildMeta: jest.fn(),
    };

    beforeEach(async () => {

        jest.clearAllMocks();

        const module: TestingModule =
            await Test.createTestingModule({

                providers: [

                    RatingService,

                    {

                        provide: PrismaService,

                        useValue: mockPrisma,

                    },

                    {

                        provide: PaginationHelper,

                        useValue: mockPaginationHelper,

                    },

                ],

            }).compile();

        service = module.get(RatingService);

    });


    it('should upsert rating', async () => {
        mockPrisma.rating.upsert.mockResolvedValue({
            id: '1',
            value: 5,
        });

        const result = await service.addRating(
            'user-1',
            'title-1',
            5,
        );

        expect(result.value).toBe(5);

        expect(mockPrisma.rating.upsert).toHaveBeenCalledWith({
            where: {
                user_id_title_id: {
                    user_id: 'user-1',
                    title_id: 'title-1',
                },
            },
            update: { value: 5 },
            create: {
                user_id: 'user-1',
                title_id: 'title-1',
                value: 5,
            },
        });
    });


    it('should delete rating', async () => {
        mockPrisma.rating.delete.mockResolvedValue({});

        await service.removeRating('user-1', 'title-1');

        expect(mockPrisma.rating.delete).toHaveBeenCalledWith({
            where: {
                user_id_title_id: {
                    user_id: 'user-1',
                    title_id: 'title-1',
                },
            },
        });
    });

it('should return paginated ratings', async () => {
  mockPrisma.rating.findMany.mockResolvedValue([
    {
      title: {
        id: 't1',
        name: 'Movie',
      },
    },
  ]);

  mockPrisma.rating.count.mockResolvedValue(1);

  mockPaginationHelper.buildMeta.mockReturnValue({
    total: 1,
    page: 1,
    limit: 10,
  });

  const result = await service.getUserRating(
    'user-1',
    1,
    10,
  );

  expect(result.data).toHaveLength(1);

  expect(result.meta.total).toBe(1);
});

    it('should calculate skip correctly', async () => {

        mockPrisma.rating.findMany.mockResolvedValue([]);

        mockPrisma.rating.count.mockResolvedValue(0);

        mockPaginationHelper.buildMeta.mockReturnValue({});

        await service.getUserRating('user-1', 3, 10);

        expect(mockPrisma.rating.findMany).toHaveBeenCalledWith(

            expect.objectContaining({

                skip: 20, // (3-1)*10

                take: 10,

            })

        );

    });


});