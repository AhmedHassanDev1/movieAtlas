

import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Prisma } from "@prisma/client";




@Catch(
    Prisma.PrismaClientKnownRequestError,
    Prisma.PrismaClientValidationError,
    Prisma.PrismaClientInitializationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log(exception.code);
        console.log(exception.message);

        const response = host.switchToHttp().getResponse();

        response.status(400).json({
            message: exception.message,
        });
    }
}