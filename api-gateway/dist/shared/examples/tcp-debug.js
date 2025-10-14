"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = require("@nestjs/microservices");
async function debugTcpConnection() {
    console.log('🔍 Bắt đầu debug TCP connection...');
    const client = microservices_1.ClientProxyFactory.create({
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3001,
        },
    });
    try {
        console.log('📞 Đang kết nối đến Auth Service...');
        await client.connect();
        console.log('✅ Kết nối thành công!');
        console.log('📤 Đang gửi test message...');
        const response = await client.send('auth.health', {}).toPromise();
        console.log('📥 Nhận được response:', response);
    }
    catch (error) {
        console.log('❌ Lỗi:', error.message);
        console.log('\n🔍 Các nguyên nhân có thể:');
        console.log('1. Auth Service chưa chạy');
        console.log('2. Port 3001 bị block');
        console.log('3. Firewall chặn kết nối');
        console.log('4. Sai địa chỉ IP/Port');
    }
    finally {
        await client.close();
        console.log('📞 Đã đóng kết nối');
    }
}
//# sourceMappingURL=tcp-debug.js.map