# Hướng dẫn chạy tất cả Services

## Tổng quan

Tài liệu này hướng dẫn cách chạy tất cả các services trong dự án microservices với một lệnh duy nhất. Dự án hiện tại bao gồm API Gateway và User Service.

## Prerequisites

Trước khi chạy, đảm bảo bạn đã cài đặt:

- **Node.js** (v18+)
- **npm** (v8+)
- **Docker Desktop**
- **Docker Compose**

## Cài đặt lần đầu

### 1. Setup toàn bộ project
```bash
# Cài đặt dependencies cho tất cả services
npm run install:all

# Khởi động Docker services (MySQL, RabbitMQ)
docker-compose up -d mysql rabbitmq

# Build tất cả services
npm run build:all

# Chạy database migrations
cd user-service && npm run prisma:migrate
```

## Chạy tất cả Services

### Sử dụng npm script
```bash
# Chạy tất cả services trong development mode
npm run start:all:dev
```

## Các lệnh npm có sẵn

### Development
```bash
# Chạy tất cả services
npm run start:all:dev

# Chạy từng service riêng lẻ
npm run start:api-gateway:dev
npm run start:user-service:dev
```

### Build
```bash
# Build tất cả services
npm run build:all

# Build từng service riêng lẻ
npm run build:api-gateway
npm run build:user-service
```

### Install Dependencies
```bash
# Cài đặt dependencies cho tất cả services
npm run install:all

# Cài đặt dependencies cho từng service
npm run install:api-gateway
npm run install:user-service
```

### Clean
```bash
# Xóa build artifacts của tất cả services
npm run clean:all

# Xóa build artifacts của từng service
npm run clean:api-gateway
npm run clean:user-service
```

### Testing
```bash
# Chạy test cho tất cả services
npm run test:all

# Chạy test cho từng service
npm run test:api-gateway
npm run test:user-service
```

### Linting
```bash
# Chạy lint cho tất cả services
npm run lint:all

# Chạy lint cho từng service
npm run lint:api-gateway
npm run lint:user-service
```

### Formatting
```bash
# Format code cho tất cả services
npm run format:all

# Format code cho từng service
npm run format:api-gateway
npm run format:user-service
```

## Docker Commands

### Quản lý Docker services
```bash
# Khởi động Docker services
npm run docker:up

# Dừng Docker services
npm run docker:down

# Build Docker images
npm run docker:build

# Xem logs
npm run docker:logs

# Restart Docker services
npm run docker:restart
```

## Kiểm tra trạng thái Services

### Kiểm tra thủ công
```bash
# API Gateway
curl http://localhost:3000/health

# User Service
curl http://localhost:3002

# RabbitMQ Management
# Mở browser: http://localhost:15672
# Username: admin, Password: admin123
```

## Dừng tất cả Services

### Thủ công
```bash
# Dừng Docker services
docker-compose down

# Dừng Node.js processes
# Nhấn Ctrl+C trong terminal đang chạy services
```

## Service URLs

Khi tất cả services chạy, bạn có thể truy cập:

- **API Gateway**: http://localhost:3000
- **User Service**: http://localhost:3002
- **RabbitMQ Management**: http://localhost:15672
- **MySQL**: localhost:3306

## Testing

### Test thủ công
```bash
# Test API Gateway
curl http://localhost:3000/info

# Test User Service
curl http://localhost:3002

# Test Rollback functionality
curl http://localhost:3000/rollback/user-service/health
```

## Troubleshooting

### 1. Lỗi port đã được sử dụng
```bash
# Kiểm tra process đang sử dụng port
netstat -ano | findstr :3000
netstat -ano | findstr :3002

# Dừng process
taskkill /PID <PID> /F
```

### 2. Lỗi Docker
```bash
# Restart Docker Desktop
# Hoặc chạy lại Docker services
docker-compose down
docker-compose up -d mysql rabbitmq
```

### 3. Lỗi dependencies
```bash
# Cài đặt lại dependencies
npm run clean:all
npm run install:all
```

### 4. Lỗi database
```bash
# Chạy lại migrations
cd user-service && npm run prisma:migrate
```

## Logs

### Xem logs của tất cả services
```bash
# Docker logs
docker-compose logs -f

# Logs của service cụ thể
docker-compose logs -f api-gateway
docker-compose logs -f user-service
```

### Xem logs trong development
Khi chạy `npm run start:all:dev`, logs sẽ hiển thị trong terminal với màu sắc khác nhau cho từng service.

## Performance Tips

1. **Sử dụng SSD** để cải thiện performance
2. **Tăng RAM** cho Docker Desktop (ít nhất 4GB)
3. **Đóng các ứng dụng không cần thiết** khi chạy services
4. **Sử dụng WSL2** trên Windows để cải thiện performance Docker

## Development Workflow

1. **Setup lần đầu**: Cài đặt dependencies và khởi động Docker
2. **Chạy services**: `npm run start:all:dev`
3. **Kiểm tra status**: Sử dụng curl hoặc browser
4. **Test**: Test thủ công các endpoints
5. **Dừng services**: `docker-compose down` hoặc Ctrl+C
