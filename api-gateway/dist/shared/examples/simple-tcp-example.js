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
var SimpleTcpExample_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleTcpExample = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let SimpleTcpExample = SimpleTcpExample_1 = class SimpleTcpExample {
    constructor() {
        this.logger = new common_1.Logger(SimpleTcpExample_1.name);
        this.authClient = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.TCP,
            options: {
                host: 'localhost',
                port: 3001,
            },
        });
    }
    async connect() {
        try {
            await this.authClient.connect();
            this.logger.log('✅ Đã kết nối đến Auth Service thành công!');
        }
        catch (error) {
            this.logger.error('❌ Không thể kết nối đến Auth Service:', error.message);
        }
    }
    async sendLoginRequest() {
        try {
            const loginData = {
                email: 'test@example.com',
                password: '123456'
            };
            this.logger.log('📤 Đang gửi tin nhắn đến Auth Service...');
            const response = await this.authClient.send('auth.login', loginData).toPromise();
            this.logger.log('📥 Nhận được phản hồi từ Auth Service:', response);
            return response;
        }
        catch (error) {
            this.logger.error('❌ Lỗi khi gửi tin nhắn:', error.message);
            return null;
        }
    }
    async disconnect() {
        await this.authClient.close();
        this.logger.log('📞 Đã đóng kết nối TCP');
    }
};
exports.SimpleTcpExample = SimpleTcpExample;
exports.SimpleTcpExample = SimpleTcpExample = SimpleTcpExample_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SimpleTcpExample);
//# sourceMappingURL=simple-tcp-example.js.map