import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from '../search.controller';
import { SearchService } from '../search.service';

describe('SearchController', () => {

  let controller: SearchController;

  const mockSearchService = {

    getTitleByName: jest.fn(),

  };

  beforeEach(async () => {

    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({

        controllers: [

          SearchController

        ],

        providers: [

          {

            provide: SearchService,

            useValue: mockSearchService

          }

        ]

      }).compile();

    controller = module.get<SearchController>(
      SearchController
    );

  });
it('should search titles by name', async () => {

  const response = {

    data: [

      {

        id: '1',

        title: 'Breaking Bad'

      }

    ],

    meta: {

      total: 1,

      page: 1,

      limit: 10

    }

  };

  mockSearchService

    .getTitleByName

    .mockResolvedValue(response);


  const result = await controller.SearchByTitleName(

    'breaking',

    10,

    1

  );


  expect(result)

    .toEqual(response);


  expect(

    mockSearchService.getTitleByName

  )

  .toHaveBeenCalledWith(

    'breaking',

    1,

    10

  );

});
});