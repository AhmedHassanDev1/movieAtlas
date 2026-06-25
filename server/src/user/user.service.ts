import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DTOMapper } from 'src/shared/helpers/mapper';
import { PrismaService } from 'src/shared/services/prisma.service';
import { UserReponseDTO } from './dto/userReponse.dto';
import { UploadService } from 'src/shared/services/upload.service';
import { UpdateAvatarType, userUpdate } from './user.types';

@Injectable()
export class UserService {
    constructor(
        private readonly Repo: PrismaService,
        private readonly uploader: UploadService
    ) { }
    async getUserSettings(userId: string) {
        const settings = await this.Repo.user.findUnique({ where: { id: userId } });

        return {
            id: userId,
            allow_watched: settings?.allow_watched ?? true,
            allow_reviews: settings?.allow_reviews ?? true,
            allow_interest: settings?.allow_interest ?? true,
            allow_watchlist: settings?.allow_watchlist ?? true,
            allow_rating: settings?.allow_rating ?? true,
        };
    }
    async getUseById(id: string) {
        const user = await this.Repo.user.findUnique({
            where: { id },
            select: {
                id: true,
                user_name: true,
                email: true,
                bio:true,
                created_at:true,
                avatar: {
                    select: {
                        public_id: true,
                        url: true
                    }
                }
            }
        })
        if(!user) throw new NotFoundException("not found user.")
        return DTOMapper.toResponse(user, UserReponseDTO)
    }
    async editProfile({ userId, user_name, bio }: userUpdate) {
        const data: any = {};
         console.log(bio);
         
        if (user_name !== undefined) {
            data.user_name = user_name;
        }

        if (bio !== undefined) {
            data.bio = bio;
        }

        let updated = await this.Repo.user.update({
            where: {
                id: userId
            },
            data
        })
        return updated
    }

    async updateAvatar({ userId, fileBuffer }: UpdateAvatarType) {
        if (!fileBuffer) {
            throw new BadRequestException("File is required");
        }

        const result = await this.uploader.uploadProfileImage(fileBuffer);
        const avatar = await this.Repo.avatar.findUnique({ where: { user_id: userId } })

        if (!result.secure_url || !result.public_id) {
            throw new InternalServerErrorException("Upload failed");
        }

        try {
            const updatedAvatar = await this.Repo.avatar.upsert({
                where: { user_id: userId },
                update: {
                    url: result.secure_url,
                    public_id: result.public_id,
                },
                create: {
                    user_id: userId,
                    url: result.secure_url,
                    public_id: result.public_id,
                },
            });
            if (avatar) await this.uploader.deleteImage(avatar.public_id);

            return updatedAvatar;

        } catch (e) {
            await this.uploader.deleteImage(result.public_id);
            throw new InternalServerErrorException("Failed to update avatar");
        }
    }


}
