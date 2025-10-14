"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_service_module_1 = require("../services/user-service/user-service.module");
const health_module_1 = require("../services/health/health.module");
const rollback_module_1 = require("../services/rollback/rollback.module");
const common_module_1 = require("../shared/common/common.module");
const microservice_exception_filter_1 = require("../shared/common/filters/microservice-exception.filter");
const response_interceptor_1 = require("../shared/common/interceptors/response.interceptor");
const validation_pipe_1 = require("../shared/common/pipes/validation.pipe");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_service_module_1.UserServiceModule,
            health_module_1.HealthModule,
            rollback_module_1.RollbackModule,
            common_module_1.CommonModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: microservice_exception_filter_1.MicroserviceExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: validation_pipe_1.ValidationPipe,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map