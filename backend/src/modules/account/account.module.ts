import { Module, Global } from '@nestjs/common'
import { AccountResolver } from './account.resolver'
import { AccountService } from './account.service'
@Global()
@Module({
	providers: [AccountResolver, AccountService],
	exports: [AccountService]
})
export class AccountModule {}
