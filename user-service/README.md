# User Service

User Service là một microservice được xây dựng bằng NestJS, cung cấp đầy đủ các chức năng CRUD cho User entity.

## 🏗️ Architecture

Service được xây dựng theo **Clean Architecture** pattern:

```
src/
├── domain/           # Business logic & entities
├── application/      # Use cases & DTOs
├── infrastructure/   # Database & external services
└── presentation/     # Controllers & APIs
```

## 🚀 Quick Start

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Setup database
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### 3. Chạy service
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## 📡 API Endpoints

### HTTP REST API
- **Base URL**: `http://localhost:3002`
- **Endpoints**: `/users` (GET, POST, PUT, DELETE)

### RabbitMQ Message Patterns
- **Queue**: `user_service_queue`
- **Patterns**: `user.create`, `user.findAll`, `user.findById`, `user.update`, `user.delete`

## 🧪 Testing

### Test CRUD API
```bash
npm run test:crud
```

### Manual Testing với cURL
```bash
# Tạo user
curl -X POST http://localhost:3002/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":25,"password":"password123"}'

# Lấy tất cả users
curl http://localhost:3002/users

# Lấy user theo ID
curl http://localhost:3002/users/{id}

# Cập nhật user
curl -X PUT http://localhost:3002/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"John Smith","age":26}'

# Xóa user
curl -X DELETE http://localhost:3002/users/{id}
```

## 📋 Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete users
- ✅ **Input Validation**: Email format, age range, required fields
- ✅ **Password Security**: bcrypt hashing
- ✅ **Dual API Support**: HTTP REST + RabbitMQ messages
- ✅ **Error Handling**: Comprehensive error responses
- ✅ **Clean Architecture**: Separation of concerns
- ✅ **Database Integration**: Prisma ORM với MySQL

## 🔧 Configuration

### Environment Variables
- **Database**: MySQL connection string trong `prisma/schema.prisma`
- **RabbitMQ**: Connection URL trong `src/main.ts`
- **Port**: 3002 (có thể thay đổi trong `src/main.ts`)

### Database Schema
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INT NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 📚 Documentation

Chi tiết API documentation: [USER_CRUD_API.md](./USER_CRUD_API.md)

## 🛠️ Development

### Available Scripts
```bash
npm run start:dev      # Development mode với hot reload
npm run build          # Build production
npm run start:prod     # Start production
npm run test           # Run unit tests
npm run test:e2e       # Run e2e tests
npm run lint           # Lint code
npm run format         # Format code
npm run prisma:studio  # Open Prisma Studio
npm run test:crud      # Test CRUD API
```

### Project Structure
```
user-service/
├── src/
│   ├── domain/
│   │   ├── entities/user.entity.ts
│   │   ├── interfaces/user.repository.interface.ts
│   │   └── tokens/user.tokens.ts
│   ├── application/
│   │   ├── dto/user.dto.ts
│   │   └── use-cases/user/
│   ├── infrastructure/
│   │   ├── database/prisma.service.ts
│   │   └── repositories/prisma-user.repository.ts
│   └── presentation/
│       └── controllers/
├── prisma/
│   └── schema.prisma
└── test-crud-api.js
```

## 🔗 Integration

User Service có thể được tích hợp với:
- **API Gateway**: Thông qua HTTP REST API
- **Other Services**: Thông qua RabbitMQ message patterns
- **Frontend Applications**: Thông qua HTTP REST API

## 📝 Notes

- Service sử dụng UUID cho user IDs
- Passwords được hash bằng bcrypt với salt rounds = 10
- Email phải unique trong hệ thống
- Age phải trong khoảng 1-120
- Tất cả timestamps sử dụng UTC timezone
