"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./controllers/user.controller");
const user_message_controller_1 = require("./controllers/user-message.controller");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_message_controller_1 = require("./controllers/auth-message.controller");
const user_module_1 = require("../application/use-cases/user/user.module");
const auth_module_1 = require("../application/use-cases/auth/auth.module");
let PresentationModule = class PresentationModule {
};
exports.PresentationModule = PresentationModule;
exports.PresentationModule = PresentationModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, auth_module_1.AuthModule],
        controllers: [user_controller_1.UserController, user_message_controller_1.UserMessageController, auth_controller_1.AuthController, auth_message_controller_1.AuthMessageController],
        providers: [],
        exports: [],
    })
], PresentationModule);
//# sourceMappingURL=presentation.module.js.map