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
const schedule_entity_1 = require("./schedule.entity");
const schedule_service_1 = require("./schedule.service");
let ScheduleResolver = class ScheduleResolver {
    constructor(scheduleService) {
        this.scheduleService = scheduleService;
    }
    async getScheduleByMember(memberId) {
        return this.scheduleService.findScheduleByMember(memberId);
    }
    async createSchedule(scheduleInput) {
        return this.scheduleService.create(scheduleInput);
    }
    async updateSchedule(id, memberId) {
        return this.scheduleService.update(id, memberId);
    }
};
__decorate([
    graphql_1.Query(() => [schedule_entity_1.Schedule]),
    __param(0, graphql_1.Args('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleResolver.prototype, "getScheduleByMember", null);
__decorate([
    graphql_1.Mutation(() => [Boolean]),
    __param(0, graphql_1.Args('scheduleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_entity_1.ScheduleInput]),
    __metadata("design:returntype", Promise)
], ScheduleResolver.prototype, "createSchedule", null);
__decorate([
    graphql_1.Mutation(() => [Boolean]),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Args('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScheduleResolver.prototype, "updateSchedule", null);
ScheduleResolver = __decorate([
    graphql_1.Resolver('Schedule'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService])
], ScheduleResolver);
exports.ScheduleResolver = ScheduleResolver;
//# sourceMappingURL=schedule.resolver.js.map