import { Test, TestingModule } from '@nestjs/testing';
import { IntersetService } from '../../service/inerest.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { ConflictException } from '@nestjs/common';



describe('IntersetService', () => {
  let service: IntersetService;

  const prismaMock = {
    userInterest: {
      findUnique: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
      findMany: jest.fn(),
    },
    genre: {
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IntersetService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = moduleRef.get(IntersetService);

    jest.clearAllMocks();
  });

  it('should add interest if not exists', async () => {
    prismaMock.userInterest.findUnique.mockResolvedValue(null);

    prismaMock.userInterest.create.mockResolvedValue({
      user_id: '1',
      genre_id: '10',
    });

    const result = await service.addInterest('1', '10');

    expect(prismaMock.userInterest.create).toHaveBeenCalledWith({
      data: {
        user_id: '1',
        genre_id: '10',
      },
    });

    expect(result.genre_id).toBe('10');
  });

  it('should throw conflict if interest exists', async () => {
    prismaMock.userInterest.findUnique.mockResolvedValue({
      user_id: '1',
      genre_id: '10',
    });

    await expect(
      service.addInterest('1', '10'),
    ).rejects.toThrow(ConflictException);
  });
  it('should remove interest', async () => {
    prismaMock.userInterest.deleteMany.mockResolvedValue({ count: 1 });

    const result = await service.removeInterest('1', '10');

    expect(prismaMock.userInterest.deleteMany).toHaveBeenCalledWith({
      where: {
        user_id: '1',
        genre_id: '10',
      },
    });

    expect(result.count).toBe(1);
  });

  it('should return user interests with genre', async () => {
    prismaMock.userInterest.findMany.mockResolvedValue([
      {
        user_id: '1',
        genre: { id: '10', name: 'Action' },
      },
    ]);

    const result = await service.getUserInterests('1');

    expect(prismaMock.userInterest.findMany).toHaveBeenCalledWith({
      where: { user_id: '1' },
      include: { genre: true },
    });

    expect(result[0].genre.name).toBe('Action');
  });

  it('should return genre by id', async () => {
    prismaMock.genre.findFirst.mockResolvedValue({
      id: '10',
      name: 'Action',
    });

    const result = await service.getGenreById('10');

    expect(prismaMock.genre.findFirst).toHaveBeenCalledWith({
      where: { id: '10' },
    });

    expect(result?.name).toBe('Action');
  });


})
