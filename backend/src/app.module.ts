import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlService } from './graphqlConfig/graphql.service'
import { GraphqlModule } from './graphqlConfig/graphql.module';
import { AccountModule } from '../src/modules/account/account.module'
import { MemberModule } from '../src/modules/member/member.module'
import { CompanyModule } from '../src/modules/company/company.module'
import { ServiceModule } from '../src/modules/service/service.module'
import { UploadModule } from '../src/modules/S3/upload.module'
import { BillModule } from '../src/modules/bill/bill.module'
import { HistoryModule} from '../src/modules/history/history.module'
import { ScheduleModule } from '../src/modules/schedule/schedule.module'
import * as path from 'path';
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlService
    }),
    AccountModule,
    GraphqlModule,
    MemberModule,
    CompanyModule,
    ServiceModule,
    UploadModule,
    BillModule,
    HistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
