# API Gateway User Integration Documentation

## Tổng quan

API Gateway cung cấp các endpoints để gọi User Service thông qua RabbitMQ message patterns. Tất cả các thao tác CRUD với User được thực hiện thông qua microservices communication.

## 🏗️ Architecture

```
Client → API Gateway → RabbitMQ → User Service → Database
```

### Luồng hoạt động:
1. Client gửi HTTP request đến API Gateway
2. API Gateway nhận request và gửi message đến User Service qua RabbitMQ
3. User Service xử lý message và thực hiện thao tác database
4. User Service trả response qua RabbitMQ
5. API Gateway nhận response và trả về cho Client

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. Tạo User mới
```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "password": "password123"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 2. Lấy tất cả Users
```http
GET /users
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 3. Lấy User theo ID
```http
GET /users/{id}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 4. Cập nhật User
```http
PUT /users/{id}
Content-Type: application/json

{
  "name": "John Smith",
  "age": 26
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "John Smith",
  "email": "john@example.com",
  "age": 26,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T01:00:00.000Z"
}
```

### 5. Xóa User
```http
DELETE /users/{id}
```

**Response:** `204 No Content`

## 🔧 RabbitMQ Configuration

### Message Patterns
- `user.create` - Tạo user mới
- `user.findAll` - Lấy tất cả users
- `user.findById` - Lấy user theo ID
- `user.update` - Cập nhật user
- `user.delete` - Xóa user

### Queue Configuration
```javascript
{
  url: 'amqp://admin:admin123@localhost:5672',
  queue: {
    user: 'user_service_queue'
  },
  exchange: {
    user: 'user_exchange'
  },
  routingKey: {
    user: 'user.routing.key'
  }
}
```

## 🏛️ Code Structure

### API Gateway Components

#### 1. User Controller (`src/services/user-service/user.controller.ts`)
- HTTP endpoints cho User CRUD operations
- Input validation và error handling
- Gọi UserService để thực hiện business logic

#### 2. User Service (`src/services/user-service/user.service.ts`)
- Business logic layer
- Gọi MicroserviceService để gửi messages
- Error handling và response formatting

#### 3. Microservice Service (`src/shared/common/services/microservice.service.ts`)
- RabbitMQ client management
- Message sending và receiving
- Connection handling và error recovery

#### 4. DTOs (`src/shared/common/dto/user.dto.ts`)
- Input validation cho CreateUserDto và UpdateUserDto
- Response formatting cho UserResponseDto

## 🧪 Testing

### Test Integration
```bash
# Chạy integration test
npm run test:user-integration
```

### Manual Testing với cURL
```bash
# Tạo user qua API Gateway
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":25,"password":"password123"}'

# Lấy tất cả users qua API Gateway
curl http://localhost:3000/users

# Lấy user theo ID qua API Gateway
curl http://localhost:3000/users/{id}

# Cập nhật user qua API Gateway
curl -X PUT http://localhost:3000/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"John Smith","age":26}'

# Xóa user qua API Gateway
curl -X DELETE http://localhost:3000/users/{id}
```

## ⚠️ Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["Validation error messages"],
  "error": "Bad Request"
}
```

#### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Failed to create user",
  "error": "User Service communication error"
}
```

### Error Scenarios
1. **User Service không chạy**: 500 Internal Server Error
2. **RabbitMQ connection failed**: 500 Internal Server Error
3. **Invalid input data**: 400 Bad Request
4. **User Service timeout**: 500 Internal Server Error

## 🔒 Security Features

1. **Input Validation**: Tất cả inputs được validate bằng class-validator
2. **Error Sanitization**: Error messages được sanitize trước khi trả về client
3. **Timeout Protection**: Request timeout để tránh hanging requests
4. **Connection Management**: Automatic reconnection cho RabbitMQ

## 📊 Performance Considerations

1. **Connection Pooling**: RabbitMQ connections được reuse
2. **Timeout Configuration**: 10 second timeout cho User Service calls
3. **Error Recovery**: Automatic reconnection khi connection bị mất
4. **Message Queuing**: Durable queues để đảm bảo message persistence

## 🚀 Deployment

### Prerequisites
1. **RabbitMQ Server**: Chạy trên localhost:5672
2. **User Service**: Chạy trên localhost:3002
3. **API Gateway**: Chạy trên localhost:3000

### Environment Variables
```bash
RABBITMQ_URL=amqp://admin:admin123@localhost:5672
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
```

### Startup Order
1. Start RabbitMQ server
2. Start User Service
3. Start API Gateway

## 🔍 Monitoring & Debugging

### Logs
- API Gateway logs: User Service communication
- RabbitMQ logs: Message routing và delivery
- User Service logs: Business logic execution

### Health Checks
```bash
# API Gateway health
curl http://localhost:3000/info

# User Service health (direct)
curl http://localhost:3002/users
```

### RabbitMQ Management
- URL: http://localhost:15672
- Username: admin
- Password: admin123

## 📝 Notes

- Tất cả User operations được thực hiện thông qua RabbitMQ
- API Gateway không lưu trữ User data
- User Service là single source of truth cho User data
- Timeout được set là 10 seconds cho tất cả User Service calls
- Error handling được implement ở cả API Gateway và User Service level
