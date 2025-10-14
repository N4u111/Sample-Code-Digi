// Ví dụ đơn giản về TCP Socket trong NestJS

import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class SimpleTcpExample {
  private readonly logger = new Logger(SimpleTcpExample.name);
  private authClient: ClientProxy;

  constructor() {
    // Bước 1: Tạo "điện thoại" để gọi Auth Service
    this.authClient = ClientProxyFactory.create({
      transport: Transport.TCP,  // Chọn loại TCP
      options: {
        host: 'localhost',       // Địa chỉ máy tính
        port: 3001,             // Cổng của Auth Service
      },
    });
  }

  async connect() {
    try {
      // Bước 2: "Nhấc máy" - kết nối đến Auth Service
      await this.authClient.connect();
      this.logger.log('✅ Đã kết nối đến Auth Service thành công!');
    } catch (error) {
      this.logger.error('❌ Không thể kết nối đến Auth Service:', error.message);
    }
  }

  async sendLoginRequest() {
    try {
      // Bước 3: Gửi tin nhắn qua TCP
      const loginData = {
        email: 'test@example.com',
        password: '123456'
      };

      this.logger.log('📤 Đang gửi tin nhắn đến Auth Service...');
      
      // Gửi tin nhắn với pattern "auth.login"
      const response = await this.authClient.send('auth.login', loginData).toPromise();
      
      this.logger.log('📥 Nhận được phản hồi từ Auth Service:', response);
      return response;
      
    } catch (error) {
      this.logger.error('❌ Lỗi khi gửi tin nhắn:', error.message);
      return null;
    }
  }

  async disconnect() {
    // Bước 4: "Cúp máy" - đóng kết nối
    await this.authClient.close();
    this.logger.log('📞 Đã đóng kết nối TCP');
  }
}

// Cách sử dụng:
/*
const tcpExample = new SimpleTcpExample();

// Kết nối
await tcpExample.connect();

// Gửi request
const result = await tcpExample.sendLoginRequest();

// Đóng kết nối
await tcpExample.disconnect();
*/
