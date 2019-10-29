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
const service_entity_1 = require("./service.entity");
const dynamoDB = require('../../dynamoDB');
let ServiceService = class ServiceService {
    constructor() { }
    async findAllTypeService() {
        const a = await dynamoDB.scan({
            TableName: 'Service'
        });
        const lst = [];
        a.Items.forEach(element => {
            const service = new service_entity_1.Service();
            service.id = element.serviceId;
            service.name = element.name;
            service.logo = element.logo;
            lst.push(service);
        });
        return lst;
    }
};
ServiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map