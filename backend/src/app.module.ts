import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlService } from './graphqlConfig/graphql.service'
import { GraphqlModule }  from './graphqlConfig/graphql.module';
import { AccountModule } from '../src/modules/account/account.module'
import { MemberModule} from '../src/modules/member/member.module'
import { CompanyModule } from '../src/modules/company/company.module'
import * as path from 'path';
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlService
    }),
  AccountModule,
  GraphqlModule,
  MemberModule,
  CompanyModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
