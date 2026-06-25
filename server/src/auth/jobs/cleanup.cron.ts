import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "src/shared/services/prisma.service";


@Injectable()
export class CleanUpService {
    constructor(
        private readonly Repo: PrismaService,
    ) { }
    @Cron(CronExpression.EVERY_12_HOURS)
    async cleanUp() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const result = await this.Repo.user.deleteMany({
            where: {
                is_verify: false,
                created_at: {
                    lt: sevenDaysAgo,
                },
            }
        })
        console.log(`Deleted users: ${result.count}`);
    }
}