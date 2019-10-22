import { Injectable } from '@nestjs/common'
require('dotenv').config()
import { ApolloError } from 'apollo-server-core'
const aws = require('aws-sdk')
const dynamoDB = require('../../dynamoDB')
const s3Bucket = process.env.S3_BUCKET;
@Injectable()
export class UploadService {
    constructor() { }
    signS3 = async (filename,filetype,) => {
        // AWS_ACCESS_KEY_ID
        // AWS_SECRET_ACCESS_KEY
        const s3 = new aws.S3({
            signatureVersion: 'v4',
            region: 'us-east-2',
        });

        const s3Params = {
            Bucket: s3Bucket,
            Key: filename,
            Expires: 60,
            ContentType: filetype,
            ACL: 'public-read',
        };

        const signedRequest = await s3.getSignedUrl('putObject', s3Params);
        const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

        return {
            signedRequest,
            url,
        }
    }
}
