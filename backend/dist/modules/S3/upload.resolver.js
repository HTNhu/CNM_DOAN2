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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const upload_service_1 = require("./upload.service");
const upload_entity_1 = require("./upload.entity");
let UploadResolver = class UploadResolver {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async signS3(filename, filetype) {
        return this.uploadService.signS3(filename, filetype);
    }
};
__decorate([
    graphql_1.Mutation(() => [upload_entity_1.S3Payload]),
    __param(0, graphql_1.Args('filename')),
    __param(1, graphql_1.Args('filetype')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "signS3", null);
UploadResolver = __decorate([
    graphql_1.Resolver('Upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadResolver);
exports.UploadResolver = UploadResolver;
//# sourceMappingURL=upload.resolver.js.map