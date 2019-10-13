import { Module } from '@nestjs/common'
import { GqlService } from './graphql.service'

@Module({
  providers: [GqlService]
})
export class GraphqlModule {}