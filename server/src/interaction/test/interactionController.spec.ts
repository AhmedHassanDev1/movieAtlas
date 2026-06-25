import { Test, TestingModule } from '@nestjs/testing';
import { InteractionController } from '../controller/interaction.controller';
import { InteractionsService } from '../service/Interactions.service';

describe('InteractionController', () => {

  let controller: InteractionController;

  const mockInteractionService = {

    getTitleStat: jest.fn(),

    getUserStat: jest.fn(),

  };

  beforeEach(async () => {

    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({

        controllers: [InteractionController],

        providers: [

          {

            provide: InteractionsService,

            useValue: mockInteractionService

          }

        ]

      }).compile();

    controller = module.get(InteractionController);

  });
it('should return title stat', async () => {

  mockInteractionService.getTitleStat
    .mockResolvedValue({

      rating: 8.5,

      likes: 100

    });

  const result = await controller.getTitleStat(

    'user-id',

    'title-id'

  );

  expect(result).toEqual({

    rating: 8.5,

    likes: 100

  });

  expect(mockInteractionService.getTitleStat)
    .toHaveBeenCalledWith(

      'user-id',

      'title-id'

    );

});

it('should return user stat', async () => {

  mockInteractionService.getUserStat
    .mockResolvedValue({

      reviews: 10,

      ratings: 5

    });

  const result = await controller.getUserStat(
    'user-id'
  );

  expect(result).toEqual({

    reviews: 10,

    ratings: 5

  });

  expect(mockInteractionService.getUserStat)
    .toHaveBeenCalledWith(
      'user-id'
    );

});
});