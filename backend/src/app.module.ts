import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
@Module({
  imports: [ GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    definitions: {
      path: path.join(process.cwd(), 'src/graphql.ts'),
      outputAs: 'class',
    },
  }) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
