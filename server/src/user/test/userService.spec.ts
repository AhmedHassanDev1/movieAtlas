import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { UploadService } from 'src/shared/services/upload.service';

describe('UserService', () => {
    let service: UserService;

    const mockPrisma = {
        user: {
            findUnique: jest.fn(),
            update: jest.fn(),
        },

        avatar: {
            findUnique: jest.fn(),
            upsert: jest.fn(),
        },
    };

    const mockUploader = {
        uploadProfileImage: jest.fn(),
        deleteImage: jest.fn(),
    };

    beforeEach(async () => {

        jest.clearAllMocks();

        const module: TestingModule =
            await Test.createTestingModule({

                providers: [

                    UserService,

                    {
                        provide: PrismaService,
                        useValue: mockPrisma,
                    },

                    {
                        provide: UploadService,
                        useValue: mockUploader,
                    }

                ]

            }).compile();

        service = module.get(UserService);

    });

    it('should return default settings if user not found', async () => {

        mockPrisma.user.findUnique.mockResolvedValue(null);

        const result = await service.getUserSettings('123');

        expect(result).toEqual({

            id: '123',

            allow_watched: true,

            allow_reviews: true,

            allow_interest: true,

            allow_watchlist: true,

            allow_rating: true,

        });

    });

    it('should update user profile', async () => {

        mockPrisma.user.update.mockResolvedValue({

            id: '123',

            user_name: 'Ahmed',

            bio: 'Developer'

        });

        const result = await service.editProfile({

            userId: '123',

            user_name: 'Ahmed',

            bio: 'Developer'

        });

        expect(mockPrisma.user.update)
            .toHaveBeenCalledWith({

                where: {
                    id: '123'
                },

                data: {

                    user_name: 'Ahmed',

                    bio: 'Developer'

                }

            });

        expect(result.user_name)
            .toBe('Ahmed');

    });

    it('should throw if file is missing', async () => {

        await expect(

            service.updateAvatar({

                userId: '123',

                fileBuffer: null as any

            })

        ).rejects.toThrow(
            'File is required'
        );

    });

    it('should upload avatar successfully', async () => {

        mockUploader.uploadProfileImage
            .mockResolvedValue({

                secure_url: 'url',

                public_id: 'new-id'

            });

        mockPrisma.avatar.findUnique
            .mockResolvedValue({

                public_id: 'old-id'

            });

        mockPrisma.avatar.upsert
            .mockResolvedValue({

                user_id: '123',

                url: 'url',

                public_id: 'new-id'

            });

        const result = await service.updateAvatar({

            userId: '123',

            fileBuffer: Buffer.from('test')

        });

        expect(mockUploader.uploadProfileImage)
            .toHaveBeenCalled();

        expect(mockPrisma.avatar.upsert)
            .toHaveBeenCalled();

        expect(mockUploader.deleteImage)
            .toHaveBeenCalledWith('old-id');

        expect(result.public_id)
            .toBe('new-id');

    });

    it('should delete uploaded image if db fails', async () => {

        mockUploader.uploadProfileImage
            .mockResolvedValue({

                secure_url: 'url',

                public_id: 'new-id'

            });

        mockPrisma.avatar.findUnique
            .mockResolvedValue(null);

        mockPrisma.avatar.upsert
            .mockRejectedValue(
                new Error()
            );

        await expect(

            service.updateAvatar({

                userId: '123',

                fileBuffer: Buffer.from('test')

            })

        ).rejects.toThrow(
            'Failed to update avatar'
        );

        expect(mockUploader.deleteImage)
            .toHaveBeenCalledWith(
                'new-id'
            );

    });


})