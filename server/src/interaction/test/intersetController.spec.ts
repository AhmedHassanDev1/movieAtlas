import { Test, TestingModule } from '@nestjs/testing';
import { InterestController } from '../controller/interset.controller';
import { IntersetService } from '../service/inerest.service';

describe('InterestController', () => {

  let controller: InterestController;

  const mockInterestService = {

    addInterest: jest.fn(),

    removeInterest: jest.fn(),

    getUserInterests: jest.fn(),

    getGenreById: jest.fn(),

  };

  beforeEach(async () => {

    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({

        controllers: [InterestController],

        providers: [

          {

            provide: IntersetService,

            useValue: mockInterestService,

          },

        ],

      }).compile();

    controller = module.get(InterestController);

  });
it('should add interest', async () => {

  mockInterestService.addInterest
    .mockResolvedValue({

      user_id: 'user-1',

      genre_id: 'genre-1',

    });

  const result = await controller.addInterest(

    'user-1',

    'genre-1'

  );

  expect(result).toEqual({

    user_id: 'user-1',

    genre_id: 'genre-1',

  });

  expect(mockInterestService.addInterest)
    .toHaveBeenCalledWith(
      'user-1',
      'genre-1'
    );

});

it('should remove interest', async () => {

  mockInterestService.removeInterest
    .mockResolvedValue(undefined);

  await controller.removeInterest(

    'user-1',

    'genre-1'

  );

  expect(mockInterestService.removeInterest)
    .toHaveBeenCalledWith(
      'user-1',
      'genre-1'
    );

});


it('should return user interests', async () => {

  mockInterestService.getUserInterests
    .mockResolvedValue([

      {

        id: 'genre-1',

        name: 'Action',

      },

    ]);

  const result = await controller.getMyInterests(
    'user-1'
  );

  expect(result).toHaveLength(1);

  expect(mockInterestService.getUserInterests)
    .toHaveBeenCalledWith('user-1');

});


it('should return genre users', async () => {

  mockInterestService.getGenreById
    .mockResolvedValue({

      id: 'genre-1',

      name: 'Action',

      users: 120,

    });

  const result = await controller.getUsersByGenre(
    'genre-1'
  );

  expect(result).toEqual({

    id: 'genre-1',

    name: 'Action',

    users: 120,

  });

  expect(mockInterestService.getGenreById)
    .toHaveBeenCalledWith('genre-1');

});

});