import { Module } from '@nestjs/common';
import { BillResolver } from './bill.resolver';
import { BillService } from './bill.service';

@Module({
  providers: [BillResolver, BillService]
})
export class BillModule {}
