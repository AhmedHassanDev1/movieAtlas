import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from '../search.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';

describe('SearchService', () => {

  let service: SearchService;

  const mockPrisma = {

    $queryRaw: jest.fn(),

  };

  const mockPaginationHelper = {

    buildMeta: jest.fn(),

  };

  beforeEach(async () => {

    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({

        providers: [

          SearchService,

          {
            provide: PrismaService,

            useValue: mockPrisma,
          },

          {
            provide: PaginationHelper,

            useValue: mockPaginationHelper,
          }

        ]

      }).compile();

    service = module.get<SearchService>(
      SearchService
    );

  });
it('should return search result', async () => {

  mockPrisma.$queryRaw

    .mockResolvedValueOnce([

      {

        id: '1',

        title: 'Breaking Bad',

        rank: 0.9

      }

    ])

    .mockResolvedValueOnce([

      {

        count: 1

      }

    ]);


  mockPaginationHelper

    .buildMeta

    .mockReturnValue({

      total: 1,

      page: 1,

      limit: 10

    });


  const result = await service.getTitleByName(

    'breaking',

    1,

    10

  );


  expect(result.data)

    .toHaveLength(1);


  expect(result.meta)

    .toEqual({

      total: 1,

      page: 1,

      limit: 10

    });


  expect(mockPrisma.$queryRaw)

    .toHaveBeenCalledTimes(2);

});

it('should use default pagination values', async () => {

  mockPrisma.$queryRaw

    .mockResolvedValueOnce([])

    .mockResolvedValueOnce([

      {

        count: 0

      }

    ]);

  mockPaginationHelper

    .buildMeta

    .mockReturnValue({});


  await service.getTitleByName(

    'batman',

    null as any,

    null as any

  );


  expect(mockPaginationHelper.buildMeta)

    .toHaveBeenCalledWith(

      0,

      1,

      10

    );

});
});