import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AccountModule } from '../src/modules/account/account.module'
import * as path from 'path';
@Module({
  imports: [ GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    definitions: {
      path: path.join(process.cwd(), 'src/graphql.ts'),
      outputAs: 'class',
    },
  }) ,
  AccountModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
