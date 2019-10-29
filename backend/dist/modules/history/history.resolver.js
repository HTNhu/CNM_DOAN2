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
const history_entity_1 = require("./history.entity");
const history_service_1 = require("./history.service");
let HistoryResolver = class HistoryResolver {
    constructor(hisService) {
        this.hisService = hisService;
    }
    async getHistoryByCompany(company) {
        return this.hisService.findHistoryByCompany(company);
    }
    async getHistoryByMember(username) {
        return this.hisService.findHistoryByMember(username);
    }
    async createHistory(hisInput) {
        return this.hisService.create(hisInput);
    }
};
__decorate([
    graphql_1.Query(() => [history_entity_1.History]),
    __param(0, graphql_1.Args('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HistoryResolver.prototype, "getHistoryByCompany", null);
__decorate([
    graphql_1.Query(() => [history_entity_1.History]),
    __param(0, graphql_1.Args('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HistoryResolver.prototype, "getHistoryByMember", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('hisInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [history_entity_1.HistoryInput]),
    __metadata("design:returntype", Promise)
], HistoryResolver.prototype, "createHistory", null);
HistoryResolver = __decorate([
    graphql_1.Resolver('History'),
    __metadata("design:paramtypes", [history_service_1.HistoryService])
], HistoryResolver);
exports.HistoryResolver = HistoryResolver;
//# sourceMappingURL=history.resolver.js.map