

import {
    Controller,
    Post,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
   
} from '@nestjs/common';
import { IntersetService } from '../service/inerest.service';
import { User } from 'src/shared/decorators/user.decorator';
import { Public } from 'src/shared/decorators/publicRoute.decorator';

@Controller('interests')
export class InterestController {
    constructor(private readonly intersetService: IntersetService,) { }
     
    @Post(':genreId')
    async addInterest(
        @User('id') userId: string,
        @Param('genreId', ParseUUIDPipe) genreId: string,
    ) {
        return this.intersetService.addInterest(userId, genreId);
    }

    @Delete(':genreId')
    async removeInterest(
        @User('id') userId: string,
        @Param('genreId', ParseUUIDPipe) genreId: string,
    ) {
        return this.intersetService.removeInterest(userId, genreId);
    }

    @Get('me')
    async getMyInterests(@User('id') userId: string) {
        return this.intersetService.getUserInterests(userId);
    }
    
    @Public() 
    @Get('genre/:genreId')
    async getUsersByGenre(
        @Param('genreId', ParseUUIDPipe) genreId: string,
    ) {
        return this.intersetService.getGenreById(genreId);
    }

   


}