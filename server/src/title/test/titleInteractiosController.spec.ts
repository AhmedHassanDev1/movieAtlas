import { Test } from "@nestjs/testing";
import { TitleInteractiosController } from "../controller/titleInteractios.controller";
import { WatchListService } from "src/interaction/service/watchlist.service";
import { RatingService } from "src/interaction/service/rating.service";
import { WatchedService } from "src/interaction/service/watched.service";
import { ReviewService } from "src/interaction/service/review.service";

describe('TitleInteractiosController', () => {

    let controller: TitleInteractiosController;

    const mockRatingService = {
        addRating: jest.fn(),
        removeRating: jest.fn(),
    };

    const mockWatchListService = {
        addToWatchList: jest.fn(),
        removeFromWatchList: jest.fn(),
    };

    const mockWatchedService = {
        setWatched: jest.fn(),
        unWatched: jest.fn(),
    };

    const mockReviewService = {
        addReview: jest.fn(),
        removeReview: jest.fn(),
    };

    beforeEach(async () => {

        jest.clearAllMocks();

        const module = await Test.createTestingModule({

            controllers: [TitleInteractiosController],

            providers: [

                {
                    provide: RatingService,
                    useValue: mockRatingService
                },

                {
                    provide: WatchListService,
                    useValue: mockWatchListService
                },

                {
                    provide: WatchedService,
                    useValue: mockWatchedService
                },

                {
                    provide: ReviewService,
                    useValue: mockReviewService
                }

            ]

        }).compile();

        controller = module.get(
            TitleInteractiosController
        );

    });
  it('should add rating', async () => {

  mockRatingService
    .addRating
    .mockResolvedValue({

      id: 'rating-id',

      value: 9

    });

  const result = await controller.addRating(

    'user-id',

    'title-id',

    {

      value: 9

    }

  );

  expect(result).toEqual({

    id: 'rating-id',

    value: 9

  });

  expect(mockRatingService.addRating)
    .toHaveBeenCalledWith(

      'user-id',

      'title-id',

      9

    );

});

it('should remove rating', async () => {

  mockRatingService
    .removeRating
    .mockResolvedValue(undefined);

  await controller.removeRating(

    'user-id',

    'title-id'

  );

  expect(mockRatingService.removeRating)
    .toHaveBeenCalledWith(

      'user-id',

      'title-id'

    );

});

it('should add title to watchlist', async () => {

  mockWatchListService
    .addToWatchList
    .mockResolvedValue(undefined);

  await controller.addToWatchlist(

    'user-id',

    'title-id'

  );

  expect(mockWatchListService.addToWatchList)
    .toHaveBeenCalledWith(

      'user-id',

      'title-id'

    );

});
it('should set watched', async () => {

  mockWatchedService
    .setWatched
    .mockResolvedValue({

      user_id: 'user-id',

      title_id: 'title-id'

    });

  const result = await controller.watched(

    'user-id',

    'title-id'

  );

  expect(result).toEqual({

    user_id: 'user-id',

    title_id: 'title-id'

  });

  expect(mockWatchedService.setWatched)
    .toHaveBeenCalledWith(

      'user-id',

      'title-id'

    );

});

it('should add review', async () => {

  mockReviewService
    .addReview
    .mockResolvedValue({

      id: 'review-id',

      content: 'Amazing movie'

    });

  const result = await controller.addReview(

    'user-id',

    'title-id',

    {

      content: 'Amazing movie'

    }

  );

  expect(result).toEqual({

    id: 'review-id',

    content: 'Amazing movie'

  });

  expect(mockReviewService.addReview)
    .toHaveBeenCalledWith(

      'user-id',

      'title-id',

      'Amazing movie'

    );

});

});