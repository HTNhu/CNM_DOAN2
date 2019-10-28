import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { async } from 'rxjs/internal/scheduler/async';
// import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true
  })
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// somewhere in your initialization file
// app.use(helmet());
// app.enableCors()
  await app.listen(3000);
}
bootstrap();
