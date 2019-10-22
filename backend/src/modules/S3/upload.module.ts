import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver'
@Module({
  providers: [UploadResolver ,UploadService]
})
export class UploadModule {}
