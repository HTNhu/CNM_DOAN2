import { GqlModuleOptions } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GqlService {
  async createGqlOptions(): Promise<GqlModuleOptions>{
    return {
      typePaths: ['./**/*.graphql'],
      // path: '/online',
      installSubscriptionHandlers: true,
      playground: true,
    };
  }
}