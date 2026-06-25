

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { RatingService } from 'src/interaction/service/rating.service';
import { WatchListService } from 'src/interaction/service/watchlist.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    getUseById: jest.fn(),
    editProfile: jest.fn(),
    updateAvatar: jest.fn(),
    getUserSettings: jest.fn(),
  };

  const mockRatingService = {
    getUserRating: jest.fn(),
  };

  const mockWatchListService = {
    getUserWatchList: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],

      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: RatingService,
          useValue: mockRatingService,
        },
        {
          provide: WatchListService,
          useValue: mockWatchListService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should return current user', async () => {

    const user = {
      id: '123',
      user_name: 'Ahmed'
    };

    mockUserService.getUseById.mockResolvedValue(user);

    const result = await controller.me('123');

    expect(result).toEqual(user);

    expect(mockUserService.getUseById)
      .toHaveBeenCalledWith('123');
  });

});