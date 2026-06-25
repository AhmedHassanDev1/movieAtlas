import { Test, TestingModule } from '@nestjs/testing';
import { WatchedService } from '../../service/watched.service';
import { PrismaService } from 'src/shared/services/prisma.service';

describe('WatchedService', () => {
  let service: WatchedService;

  const prismaMock = {
    watched: {
      upsert: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        WatchedService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = moduleRef.get(WatchedService);

    jest.clearAllMocks();
  });


  it('should upsert watched record', async () => {
    prismaMock.watched.upsert.mockResolvedValue({
      user_id: '1',
      title_id: '10',
    });

    const result = await service.setWatched('1', '10');

    expect(prismaMock.watched.upsert).toHaveBeenCalledWith({
      where: {
        user_id_title_id: {
          user_id: '1',
          title_id: '10',
        },
      },
      create: {
        user_id: '1',
        title_id: '10',
      },
      update: {},
    });

    expect(result.user_id).toBe('1');
  });

  it('should delete watched record', async () => {
    prismaMock.watched.delete.mockResolvedValue({
      user_id: '1',
      title_id: '10',
    });

    const result = await service.unWatched('1', '10');

    expect(prismaMock.watched.delete).toHaveBeenCalledWith({
      where: {
        user_id_title_id: {
          user_id: '1',
          title_id: '10',
        },
      },
    });

    expect(result.title_id).toBe('10');
  });
  it('should return paginated watched list', async () => {
    prismaMock.watched.findMany.mockResolvedValue([
      {
        id: '1',
        title: { id: '10', name: 'Movie' },
        createdAt: new Date(),
      },
    ]);

    prismaMock.watched.count.mockResolvedValue(1);

    const result = await service.getUserWatched('1', 1, 20);

    expect(prismaMock.watched.findMany).toHaveBeenCalledWith({
      where: { user_id: '1' },
      include: { title: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: 0,
    });

    expect(result.meta.total).toBe(1);
    expect(result.meta.totalPages).toBe(1);
  });

  it('should normalize invalid page and limit', async () => {
    prismaMock.watched.findMany.mockResolvedValue([]);
    prismaMock.watched.count.mockResolvedValue(0);

    await service.getUserWatched('1', -5, 0);

    expect(prismaMock.watched.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 20,
        skip: 0,
      }),
    );
  });
})