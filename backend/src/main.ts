import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { async } from 'rxjs/internal/scheduler/async';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
