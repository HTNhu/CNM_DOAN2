import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Service } from './service.entity'
import { ServiceService } from './service.service'
const AWS = require('aws-sdk')
@Resolver('Typebill')
export class ServiceResolver {
  constructor(private readonly typeService: ServiceService) {}
  @Query(() => [Service])
  async getAllService() {
      return this.typeService.findAllTypeService()
  }
}