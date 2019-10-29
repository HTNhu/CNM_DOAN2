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
const bill_entity_1 = require("./bill.entity");
const bill_service_1 = require("./bill.service");
let BillResolver = class BillResolver {
    constructor(billService) {
        this.billService = billService;
    }
    async getElectricBillsByCompany(companyId) {
        return this.billService.findBillByCompany(companyId);
    }
    async getWaterBillsByCompany(companyId) {
        return this.billService.findBillByCompany(companyId);
    }
    async getElectricBillsByCompanyPhone(companyId, phone) {
        return this.billService.findBillByCompanyPhone(companyId, phone);
    }
    async createWaterBill(waterbillInput) {
        return this.billService.createWaterBill(waterbillInput);
    }
    async createElectricBill(electricbillInput) {
        return this.billService.createElectricBill(electricbillInput);
    }
    async updateStatusBill(billId, companyId) {
        return this.billService.update(billId, companyId);
    }
};
__decorate([
    graphql_1.Query(() => [bill_entity_1.ElectricBill]),
    __param(0, graphql_1.Args('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillResolver.prototype, "getElectricBillsByCompany", null);
__decorate([
    graphql_1.Query(() => [bill_entity_1.ElectricBill]),
    __param(0, graphql_1.Args('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillResolver.prototype, "getWaterBillsByCompany", null);
__decorate([
    graphql_1.Query(() => bill_entity_1.ElectricBill),
    __param(0, graphql_1.Args('companyId')),
    __param(1, graphql_1.Args('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BillResolver.prototype, "getElectricBillsByCompanyPhone", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('waterbillInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bill_entity_1.WaterBillInput]),
    __metadata("design:returntype", Promise)
], BillResolver.prototype, "createWaterBill", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('electricbillInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bill_entity_1.ElectricBillInput]),
    __metadata("design:returntype", Promise)
], BillResolver.prototype, "createElectricBill", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('billId')),
    __param(1, graphql_1.Args('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BillResolver.prototype, "updateStatusBill", null);
BillResolver = __decorate([
    graphql_1.Resolver('Bill'),
    __metadata("design:paramtypes", [bill_service_1.BillService])
], BillResolver);
exports.BillResolver = BillResolver;
//# sourceMappingURL=bill.resolver.js.map