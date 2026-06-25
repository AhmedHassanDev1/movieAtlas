import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { UploadService } from 'src/shared/services/upload.service';
import { InteractionModule } from 'src/interaction/interaction.module';
import { PaginationHelper } from 'src/shared/helpers/pagination.helper';

@Module({
  imports:[InteractionModule],
  controllers: [UserController],
  providers: [UserService,PrismaService,UploadService,PaginationHelper],
})
export class UserModule {}
