// Script debug TCP connection

import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

async function debugTcpConnection() {
  console.log('🔍 Bắt đầu debug TCP connection...');

  // Tạo client
  const client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001, // Auth Service port
    },
  });

  try {
    console.log('📞 Đang kết nối đến Auth Service...');
    await client.connect();
    console.log('✅ Kết nối thành công!');

    // Test gửi message
    console.log('📤 Đang gửi test message...');
    const response = await client.send('auth.health', {}).toPromise();
    console.log('📥 Nhận được response:', response);

  } catch (error) {
    console.log('❌ Lỗi:', error.message);
    
    // Kiểm tra các nguyên nhân có thể
    console.log('\n🔍 Các nguyên nhân có thể:');
    console.log('1. Auth Service chưa chạy');
    console.log('2. Port 3001 bị block');
    console.log('3. Firewall chặn kết nối');
    console.log('4. Sai địa chỉ IP/Port');
    
  } finally {
    await client.close();
    console.log('📞 Đã đóng kết nối');
  }
}

// Chạy debug
// debugTcpConnection();
