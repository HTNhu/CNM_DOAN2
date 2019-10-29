"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const graphql_1 = require("@nestjs/graphql");
const graphql_service_1 = require("./graphqlConfig/graphql.service");
const graphql_module_1 = require("./graphqlConfig/graphql.module");
const account_module_1 = require("../src/modules/account/account.module");
const member_module_1 = require("../src/modules/member/member.module");
const company_module_1 = require("../src/modules/company/company.module");
const service_module_1 = require("../src/modules/service/service.module");
const upload_module_1 = require("../src/modules/S3/upload.module");
const bill_module_1 = require("../src/modules/bill/bill.module");
const history_module_1 = require("../src/modules/history/history.module");
const schedule_module_1 = require("../src/modules/schedule/schedule.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            graphql_1.GraphQLModule.forRootAsync({
                useClass: graphql_service_1.GqlService
            }),
            account_module_1.AccountModule,
            graphql_module_1.GraphqlModule,
            member_module_1.MemberModule,
            company_module_1.CompanyModule,
            service_module_1.ServiceModule,
            upload_module_1.UploadModule,
            bill_module_1.BillModule,
            history_module_1.HistoryModule,
            schedule_module_1.ScheduleModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map