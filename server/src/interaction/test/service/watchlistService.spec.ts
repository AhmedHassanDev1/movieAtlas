

import { Test, TestingModule } from '@nestjs/testing';
import { WatchListService } from '../../service/watchlist.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';

describe('WatchListService', () => {

  let service: WatchListService;

  const mockPrisma = {
    watchlist: {
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
          WatchListService,
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

    service = module.get(WatchListService);
  });


  it('should add title to watchlist', async () => {

  mockPrisma.watchlist.upsert.mockResolvedValue({
    id: '1',
    user_id: 'user-1',
    title_id: 'title-1',
  });

  const result = await service.addToWatchList(
    'user-1',
    'title-1',
  );

  expect(result.user_id).toBe('user-1');

  expect(mockPrisma.watchlist.upsert).toHaveBeenCalledWith({
    where: {
      user_id_title_id: {
        user_id: 'user-1',
        title_id: 'title-1',
      },
    },
    update: {},
    create: {
      user_id: 'user-1',
      title_id: 'title-1',
    },
  });

});


it('should remove item from watchlist', async () => {

  mockPrisma.watchlist.delete.mockResolvedValue({
    id: '1',
  });

  const result = await service.removeFromWatchList(
    'user-1',
    'title-1',
  );

  expect(result).toEqual({
    id: '1',
  });

  expect(mockPrisma.watchlist.delete).toHaveBeenCalledWith({
    where: {
      user_id_title_id: {
        user_id: 'user-1',
        title_id: 'title-1',
      },
    },
  });

});

it('should return paginated watchlist', async () => {

  mockPrisma.watchlist.findMany.mockResolvedValue([
    {
      title: {
        id: 't1',
        name: 'Movie 1',
      },
    },
  ]);

  mockPrisma.watchlist.count.mockResolvedValue(1);

  mockPaginationHelper.buildMeta.mockReturnValue({
    total: 1,
    page: 1,
    limit: 10,
  });

  const result = await service.getUserWatchList(
    'user-1',
    1,
    10,
  );

  expect(result.data).toHaveLength(1);

  expect(result.meta.total).toBe(1);

  expect(mockPrisma.watchlist.findMany).toHaveBeenCalledWith(
    expect.objectContaining({
      where: {
        user_id: 'user-1',
      },
    }),
  );

});


});