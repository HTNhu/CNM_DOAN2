import { Module, Global } from '@nestjs/common'
import { ServiceResolver } from './service.resolver'
import { ServiceService } from './service.service'
@Global()
@Module({
	providers: [ServiceResolver, ServiceService],
	exports: [ServiceService]
})
export class ServiceModule {}
