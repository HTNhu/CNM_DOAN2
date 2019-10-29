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
const company_entity_1 = require("./company.entity");
const company_service_1 = require("./company.service");
let CompanyResolver = class CompanyResolver {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async getAllCompany() {
        return this.companyService.findAllCompany();
    }
    async getCompanyByUsername(username) {
        return this.companyService.findCompanyByUsername(username);
    }
    async getCompanyByService(service) {
        return this.companyService.findCompanyByService(service);
    }
    async updateListCustomerCompany(username, lstCustomer) {
        return this.companyService.update(username, lstCustomer);
    }
    async createCompany(companyInput) {
        return this.companyService.create(companyInput);
    }
};
__decorate([
    graphql_1.Query(() => company_entity_1.Company),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "getAllCompany", null);
__decorate([
    graphql_1.Query(() => company_entity_1.Company),
    __param(0, graphql_1.Args('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "getCompanyByUsername", null);
__decorate([
    graphql_1.Query(() => [company_entity_1.Company]),
    __param(0, graphql_1.Args('service')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "getCompanyByService", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('username')),
    __param(1, graphql_1.Args('lstCustomer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "updateListCustomerCompany", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('compInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_entity_1.CompanyInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "createCompany", null);
CompanyResolver = __decorate([
    graphql_1.Resolver('Company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyResolver);
exports.CompanyResolver = CompanyResolver;
//# sourceMappingURL=company.resolver.js.map