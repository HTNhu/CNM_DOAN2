import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import {HistoryResolver} from './history.resolver';
@Module({
  providers: [HistoryService, HistoryResolver]
})
export class HistoryModule {}
