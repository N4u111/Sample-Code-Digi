"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const create_user_usecase_1 = require("./create-user.usecase");
const get_user_by_id_usecase_1 = require("./get-user-by-id.usecase");
const get_all_users_usecase_1 = require("./get-all-users.usecase");
const update_user_usecase_1 = require("./update-user.usecase");
const delete_user_usecase_1 = require("./delete-user.usecase");
const infrastructure_module_1 = require("../../../infrastructure/infrastructure.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        providers: [
            create_user_usecase_1.CreateUserUseCase,
            get_user_by_id_usecase_1.GetUserByIdUseCase,
            get_all_users_usecase_1.GetAllUsersUseCase,
            update_user_usecase_1.UpdateUserUseCase,
            delete_user_usecase_1.DeleteUserUseCase,
        ],
        exports: [
            create_user_usecase_1.CreateUserUseCase,
            get_user_by_id_usecase_1.GetUserByIdUseCase,
            get_all_users_usecase_1.GetAllUsersUseCase,
            update_user_usecase_1.UpdateUserUseCase,
            delete_user_usecase_1.DeleteUserUseCase,
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map