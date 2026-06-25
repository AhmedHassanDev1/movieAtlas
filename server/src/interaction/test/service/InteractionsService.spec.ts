import { Test, TestingModule } from '@nestjs/testing';
import { InteractionsService } from '../../service/Interactions.service';
import { PrismaService } from 'src/shared/services/prisma.service';

describe('InteractionsService', () => {

  let service: InteractionsService;

  const mockPrisma = {

    rating: {
      count: jest.fn(),
      findFirst: jest.fn(),
    },

    review: {
      count: jest.fn(),
      findFirst: jest.fn(),
    },

    watchlist: {
      count: jest.fn(),
      findFirst: jest.fn(),
    },

    watched: {
      count: jest.fn(),
      findFirst: jest.fn(),
    },

    userInterest: {
      count: jest.fn(),
    },

  };

  beforeEach(async () => {

    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({

        providers: [

          InteractionsService,

          {

            provide: PrismaService,

            useValue: mockPrisma,

          },

        ],

      }).compile();

    service = module.get(InteractionsService);

  });
it('should return user stats', async () => {

  mockPrisma.rating.count
    .mockResolvedValue(5);

  mockPrisma.review.count
    .mockResolvedValue(10);

  mockPrisma.watchlist.count
    .mockResolvedValue(2);

  mockPrisma.watched.count
    .mockResolvedValue(7);

  mockPrisma.userInterest.count
    .mockResolvedValue(3);

  const result = await service.getUserStat('user-1');

  expect(result).toEqual({

    rating_count: 5,

    reviews_count: 10,

    watchlist_count: 2,

    watched_count: 7,

    interests_count: 3,

  });

  expect(mockPrisma.rating.count)
    .toHaveBeenCalledWith({
      where: { user_id: 'user-1' }
    });

});


it('should return full title stat', async () => {

  mockPrisma.watched.findFirst
    .mockResolvedValue({ id: 1 });

  mockPrisma.rating.findFirst
    .mockResolvedValue({ value: 8 });

  mockPrisma.watchlist.findFirst
    .mockResolvedValue({ id: 1 });

  const result = await service.getTitleStat(

    'user-1',

    'title-1'

  );

  expect(result).toEqual({

    watched: true,

    watchlist: true,

    rating: 8,

  });

  expect(mockPrisma.watched.findFirst)

    .toHaveBeenCalledWith({

      where: {

        user_id: 'user-1',

        title_id: 'title-1',

      },

    });

});


it('should return default values when nothing exists', async () => {

  mockPrisma.watched.findFirst
    .mockResolvedValue(null);

  mockPrisma.rating.findFirst
    .mockResolvedValue(null);

  mockPrisma.watchlist.findFirst
    .mockResolvedValue(null);

  const result = await service.getTitleStat(

    'user-1',

    'title-1'

  );

  expect(result).toEqual({

    watched: false,

    watchlist: false,

    rating: 0,

  });

});

});