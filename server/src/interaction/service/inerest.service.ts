import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma.service";

@Injectable()
export class IntersetService {
  constructor(
    private readonly Repo: PrismaService
  ) { }

  async addInterest(userId: string, genreId: string) {
    const exists = await this.Repo.userInterest.findUnique({
      where: {
        user_id_genre_id: {
          user_id: userId,
          genre_id: genreId,
        },
      },
    });

    if (exists) {
      throw new ConflictException('Interest already exists');
    }

    return this.Repo.userInterest.create({
      data: {
        user_id: userId,
        genre_id: genreId,
      },
    });
  }

  async removeInterest(userId: string, genreId: string) {
    return this.Repo.userInterest.deleteMany({
      where: {
        user_id: userId,
        genre_id: genreId,
      },
    });
  }

  async getUserInterests(userId: string) {
    return this.Repo.userInterest.findMany({
      where: {
        user_id: userId,
      },
      include: {
        genre: true,
      },
    });
  }

  async getGenreById(genreId: string) {

    const genre = await this.Repo.genre.findFirst({
      where: {
        id: genreId,
      },
    })

    return genre
  }
}