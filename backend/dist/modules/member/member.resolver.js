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
const member_entity_1 = require("./member.entity");
const member_service_1 = require("./member.service");
let MemberResolver = class MemberResolver {
    constructor(memberService) {
        this.memberService = memberService;
    }
    async getAllMember() {
        return this.memberService.findAllMember();
    }
    async getMemberByUsername(username) {
        return this.memberService.findMemberByUsername(username);
    }
    async createMember(memIput) {
        return this.memberService.create(memIput);
    }
};
__decorate([
    graphql_1.Query(() => [member_entity_1.MemberResSchedule]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MemberResolver.prototype, "getAllMember", null);
__decorate([
    graphql_1.Query(() => member_entity_1.Member),
    __param(0, graphql_1.Args('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberResolver.prototype, "getMemberByUsername", null);
__decorate([
    graphql_1.Mutation(() => [Boolean]),
    __param(0, graphql_1.Args('memInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_entity_1.MemberInput]),
    __metadata("design:returntype", Promise)
], MemberResolver.prototype, "createMember", null);
MemberResolver = __decorate([
    graphql_1.Resolver('Member'),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberResolver);
exports.MemberResolver = MemberResolver;
//# sourceMappingURL=member.resolver.js.map