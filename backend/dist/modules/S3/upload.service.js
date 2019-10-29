"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
require('dotenv').config();
const aws = require('aws-sdk');
const dynamoDB = require('../../dynamoDB');
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const s3Bucket = process.env.S3_BUCKET;
let UploadService = class UploadService {
    constructor() {
        this.signS3 = async (filename, filetype) => {
            const s3 = new aws.S3({
                signatureVersion: 'v4',
                region: 'us-east-1',
            });
            const s3Params = {
                Bucket: s3Bucket,
                Key: filename,
                Expires: 60,
                ContentType: filetype,
            };
            const signedRequest = await s3.getSignedUrl('putObject', s3Params, (err, data) => {
                console.log(data, "uewuewe");
            });
            const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
            return {
                signedRequest,
                url,
            };
        };
    }
};
UploadService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map