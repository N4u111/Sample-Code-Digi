# API Gateway - Cấu trúc thư mục

## Tổng quan
API Gateway đã được tổ chức lại theo cấu trúc service-oriented để dễ quản lý khi project lớn hơn.

## Cấu trúc thư mục

```
src/
├── app/                          # Application layer
│   ├── app.controller.ts         # Main application controller
│   ├── app.module.ts            # Main application module
│   └── app.service.ts           # Main application service
├── services/                     # Business services
│   ├── auth-service/            # Authentication & Authorization service
│   │   ├── auth-service.module.ts
│   │   ├── auth/                # Authentication
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   └── permission/          # Permission management
│   │       ├── permission.controller.ts
│   │       ├── permission.module.ts
│   │       └── permission.service.ts
│   ├── user-service/            # User & Role Management service
│   │   ├── user-service.module.ts
│   │   ├── user/                # User management
│   │   │   ├── user.controller.ts
│   │   │   ├── user.module.ts
│   │   │   └── user.service.ts
│   │   ├── role/                # Role management
│   │   │   ├── role.controller.ts
│   │   │   ├── role.module.ts
│   │   │   └── role.service.ts
│   │   └── group/               # Group management
│   │       ├── group.controller.ts
│   │       ├── group.module.ts
│   │       └── group.service.ts
│   └── health/                  # Health check service
│       ├── health.controller.ts
│       ├── health.module.ts
│       └── health.service.ts
├── shared/                      # Shared resources
│   ├── common/                  # Common utilities
│   │   ├── common.module.ts
│   │   ├── config/              # Configuration files
│   │   │   └── microservice.config.ts
│   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── auth.dto.ts
│   │   │   ├── user.dto.ts
│   │   │   ├── role.dto.ts
│   │   │   ├── permission.dto.ts
│   │   │   └── group.dto.ts
│   │   ├── filters/             # Exception filters
│   │   │   └── microservice-exception.filter.ts
│   │   ├── interceptors/        # Response interceptors
│   │   │   └── response.interceptor.ts
│   │   ├── interfaces/          # Type definitions
│   │   │   └── microservice.interface.ts
│   │   ├── pipes/               # Validation pipes
│   │   │   └── validation.pipe.ts
│   │   └── services/            # Shared services
│   │       └── microservice.service.ts
│   ├── config/                  # Environment configuration
│   │   └── environment.ts
│   └── examples/                # Example files
│       ├── simple-tcp-example.ts
│       └── tcp-debug.ts
└── main.ts                      # Application entry point
```

## Lợi ích của cấu trúc mới

### 🎯 **Tổ chức rõ ràng**
- **Services**: Mỗi service có thư mục riêng với controller, service và module
- **Shared**: Tất cả tài nguyên dùng chung được tập trung
- **App**: Layer ứng dụng chính

### 🔧 **Dễ bảo trì**
- Tách biệt rõ ràng giữa các service
- Dễ dàng thêm service mới
- Import paths rõ ràng và nhất quán

### 📈 **Scalability**
- Dễ dàng mở rộng khi project lớn
- Có thể tách thành microservices riêng biệt
- Team có thể làm việc độc lập trên từng service

### 🧪 **Testing**
- Dễ dàng test từng service riêng biệt
- Mock dependencies dễ dàng
- Unit test và integration test rõ ràng

## Import Paths

### Từ services đến shared:
```typescript
import { MicroserviceService } from '../../../shared/common/services/microservice.service';
import { CreateUserDto } from '../../../shared/common/dto/user.dto';
```

### Từ app đến services:
```typescript
import { AuthServiceModule } from '../services/auth-service/auth-service.module';
import { UserServiceModule } from '../services/user-service/user-service.module';
```

### Từ app đến shared:
```typescript
import { MicroserviceExceptionFilter } from '../shared/common/filters/microservice-exception.filter';
```

## Thêm service mới

### Thêm vào service hiện có:
1. Tạo thư mục con trong `auth-service/` hoặc `user-service/`
2. Tạo controller, service và module
3. Import module vào service module chính (`auth-service.module.ts` hoặc `user-service.module.ts`)

### Thêm service hoàn toàn mới:
1. Tạo thư mục service trong `src/services/`
2. Tạo controller, service và module
3. Import module vào `app.module.ts`
4. Cập nhật DTOs trong `shared/common/dto/` nếu cần

## API Endpoints

### Auth Service:
- **Authentication**: `/auth/*`
- **Permissions**: `/permissions/*`

### User Service:
- **Users**: `/users/*`
- **Roles**: `/roles/*`
- **Groups**: `/groups/*`

### Health Service:
- **Health Check**: `/health/*`
