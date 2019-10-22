import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UploadService } from './upload.service'
import { S3Payload } from './upload.entity'
@Resolver('Upload')
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) { }

  @Mutation(() => [S3Payload])
  async signS3(
    @Args('filename') filename: String,
    @Args('filetype') filetype: String
  ) {
    return this.uploadService.signS3(filename, filetype)
  }
 
}
