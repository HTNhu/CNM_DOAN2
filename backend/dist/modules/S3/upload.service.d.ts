export declare class UploadService {
    constructor();
    signS3: (filename: any, filetype: any) => Promise<{
        signedRequest: any;
        url: string;
    }>;
}
