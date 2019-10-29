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
const graphql_1 = require("@nestjs/graphql");
const service_entity_1 = require("./service.entity");
const service_service_1 = require("./service.service");
const AWS = require('aws-sdk');
let ServiceResolver = class ServiceResolver {
    constructor(typeService) {
        this.typeService = typeService;
    }
    async getAllService() {
        return this.typeService.findAllTypeService();
    }
};
__decorate([
    graphql_1.Query(() => [service_entity_1.Service]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "getAllService", null);
ServiceResolver = __decorate([
    graphql_1.Resolver('Typebill'),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceResolver);
exports.ServiceResolver = ServiceResolver;
//# sourceMappingURL=service.resolver.js.map