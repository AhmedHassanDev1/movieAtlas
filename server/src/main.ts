import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { appName } from './shared/constants/app';
import compression from 'compression';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Use cookie parser middleware to parse cookies in incoming requests
  app.use(cookieParser());

  app.use(helmet());

  const swagger = new DocumentBuilder()
    .setTitle(`${appName} documentation`)
    .setVersion("1.0")
    .build()

  const documentation = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup("swagger", app, documentation)
  // Enable CORS with specific origin and credentials support
  app.enableCors({
    origin: [process.env.ORIGIN, 'http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );



  // Global validation pipe configuration
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: false,
    },
  }))
  
  app.use(compression())



  // Start the application and listen on the specified port (default to 8000 if not set in environment variables)
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();

