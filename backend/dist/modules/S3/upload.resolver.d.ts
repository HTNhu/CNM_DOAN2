import { UploadService } from './upload.service';
export declare class UploadResolver {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    signS3(filename: String, filetype: String): Promise<{
        signedRequest: any;
        url: string;
    }>;
}
