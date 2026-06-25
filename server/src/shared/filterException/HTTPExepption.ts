import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";



@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus() as number;

        const errorResponse = exception.getResponse() as any;

        const message =
            typeof errorResponse === "string"
                ? errorResponse
                : Array.isArray(errorResponse["message"])
                    ? errorResponse["message"][0]
                    : errorResponse["message"];


        response
            .status(status)
            .json({
                statusCode: status,
                message,
                error: errorResponse.error,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}