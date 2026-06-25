import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from '../../service/review.service';
import { PrismaService } from 'src/shared/services/prisma.service';

describe('ReviewService', () => {

  let service: ReviewService;

  const mockPrisma = {

    user: {
      findUnique: jest.fn(),
    },

    review: {
      findFirst: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
    },

  };

  beforeEach(async () => {

    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({

        providers: [

          ReviewService,

          {

            provide: PrismaService,

            useValue: mockPrisma,

          },

        ],

      }).compile();

    service = module.get(ReviewService);

  });
it('should create a new review if not exists', async () => {

  mockPrisma.user.findUnique.mockResolvedValue({

    id: 'user-1',

    user_name: 'Ahmed',

    avatar: {

      url: 'avatar.png',

    },

  });

  mockPrisma.review.findFirst.mockResolvedValue(null);

  mockPrisma.review.create.mockResolvedValue({

    id: 'review-1',

    content: 'Great movie',

  });

  const result = await service.addReview(

    'user-1',

    'title-1',

    'Great movie'

  );

  expect(result).toEqual({

    id: 'review-1',

    content: 'Great movie',

  });

  expect(mockPrisma.review.create).toHaveBeenCalledWith({

    data: {

      user_id: 'user-1',

      title_id: 'title-1',

      content: 'Great movie',

      source: 'Local',

      name: 'Ahmed',

      avatar_path: 'avatar.png',

    },

  });

});


it('should update existing review instead of creating', async () => {

  mockPrisma.user.findUnique.mockResolvedValue({

    user_name: 'Ahmed',

    avatar: {

      url: 'avatar.png',

    },

  });

  mockPrisma.review.findFirst.mockResolvedValue({

    id: 'review-1',

  });

  mockPrisma.review.update.mockResolvedValue({

    id: 'review-1',

    content: 'Updated review',

  });

  const result = await service.addReview(

    'user-1',

    'title-1',

    'Updated review'

  );

  expect(result).toEqual({

    id: 'review-1',

    content: 'Updated review',

  });

  expect(mockPrisma.review.update).toHaveBeenCalledWith({

    where: {

      id: 'review-1',

    },

    data: {

      content: 'Updated review',

    },

  });

  expect(mockPrisma.review.create).not.toHaveBeenCalled();

});


it('should delete review by user and id', async () => {

  mockPrisma.review.deleteMany.mockResolvedValue({

    count: 1,

  });

  const result = await service.removeReview(

    'user-1',

    'review-1'

  );

  expect(result).toEqual({

    count: 1,

  });

  expect(mockPrisma.review.deleteMany).toHaveBeenCalledWith({

    where: {

      id: 'review-1',

      user_id: 'user-1',

    },

  });

});

it('should prefer update if race condition happens (simulation)', async () => {

  mockPrisma.user.findUnique.mockResolvedValue({

    user_name: 'Ahmed',

    avatar: { url: 'avatar.png' },

  });

  mockPrisma.review.findFirst.mockResolvedValue({

    id: 'review-1',

  });

  mockPrisma.review.update.mockResolvedValue({

    id: 'review-1',

  });

  const result = await service.addReview(

    'user-1',

    'title-1',

    'content'

  );

  expect(result.id).toBe('review-1');

});


});