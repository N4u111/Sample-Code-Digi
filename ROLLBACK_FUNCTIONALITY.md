# Rollback Functionality Documentation

## Tổng quan

Auth Service hiện đã được cấu hình để có thể rollback và quản lý User Service. Điều này cho phép Auth Service thực hiện các thao tác rollback, health check, và quản lý User Service thông qua RabbitMQ message patterns.

## Kiến trúc Rollback

```
Client Request → API Gateway → Auth Service → User Service
                     ↓              ↓              ↓
                Rollback API → Message Pattern → Rollback Handler
```

## API Endpoints

### API Gateway Rollback Endpoints

Base URL: `http://localhost:3000/rollback`

#### 1. **POST /rollback/user-service/restart** - Khởi động lại User Service
```http
POST /rollback/user-service/restart
```

**Response:**
```json
{
  "success": true,
  "message": "User service restart command sent",
  "data": {
    "success": true,
    "message": "User service restart initiated",
    "timestamp": "2025-01-13T09:08:00.000Z"
  }
}
```

#### 2. **GET /rollback/user-service/health** - Kiểm tra sức khỏe User Service
```http
GET /rollback/user-service/health
```

**Response:**
```json
{
  "success": true,
  "message": "User service is healthy",
  "data": {
    "success": true,
    "message": "User service is healthy",
    "status": "UP",
    "timestamp": "2025-01-13T09:08:00.000Z",
    "uptime": 3600,
    "memory": {
      "rss": 50000000,
      "heapTotal": 20000000,
      "heapUsed": 15000000,
      "external": 1000000
    }
  }
}
```

#### 3. **GET /rollback/user-service/status** - Lấy trạng thái User Service
```http
GET /rollback/user-service/status
```

**Response:**
```json
{
  "success": true,
  "message": "User service status retrieved",
  "data": {
    "success": true,
    "message": "User service status retrieved",
    "data": {
      "service": "user-service",
      "version": "1.0.0",
      "status": "RUNNING",
      "uptime": 3600,
      "memory": {...},
      "timestamp": "2025-01-13T09:08:00.000Z"
    }
  }
}
```

#### 4. **POST /rollback/user-service/rollback-operation** - Rollback một thao tác User
```http
POST /rollback/user-service/rollback-operation
Content-Type: application/json

{
  "operationId": "operation-123",
  "reason": "Data corruption detected"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Operation operation-123 rolled back successfully",
  "data": {
    "success": true,
    "message": "Operation operation-123 rolled back successfully",
    "operationId": "operation-123",
    "timestamp": "2025-01-13T09:08:00.000Z"
  }
}
```

#### 5. **POST /rollback/user-service/sync-data** - Đồng bộ dữ liệu với User Service
```http
POST /rollback/user-service/sync-data
Content-Type: application/json

{
  "syncType": "user-data",
  "timestamp": "2025-01-13T09:08:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data sync completed for type: user-data",
  "data": {
    "success": true,
    "message": "Data sync completed for type: user-data",
    "syncType": "user-data",
    "timestamp": "2025-01-13T09:08:00.000Z"
  }
}
```

## Message Patterns

### Auth Service Message Patterns

Auth Service có thể nhận các message patterns sau để thực hiện rollback:

- `auth.rollback.userService.restart` - Khởi động lại User Service
- `auth.rollback.userService.health` - Kiểm tra sức khỏe User Service
- `auth.rollback.userService.status` - Lấy trạng thái User Service
- `auth.rollback.userOperation` - Rollback thao tác User
- `auth.rollback.syncData` - Đồng bộ dữ liệu

### User Service Message Patterns

User Service có thể nhận các message patterns sau:

- `user.service.restart` - Khởi động lại service
- `user.service.health` - Kiểm tra sức khỏe
- `user.service.status` - Lấy trạng thái
- `user.rollback` - Rollback thao tác
- `user.sync` - Đồng bộ dữ liệu

## Luồng hoạt động

### 1. Rollback qua API Gateway
```
Client → API Gateway → User Service
```

1. Client gửi request đến API Gateway
2. API Gateway gửi message đến User Service
3. User Service xử lý và trả response
4. Response được trả về qua cùng luồng

### 2. Rollback trực tiếp qua User Service
```
Client → User Service
```

1. Client gửi request trực tiếp đến User Service
2. User Service xử lý rollback command
3. User Service trả response cho Client

## Cấu trúc Code


### User Service Rollback Components

```
user-service/src/application/use-cases/rollback/
├── rollback.service.ts              # Service logic
├── rollback.controller.ts           # Message Controller
└── rollback.module.ts              # Module definition
```

### API Gateway Rollback Components

```
api-gateway/src/services/rollback/
├── rollback.controller.ts           # HTTP Controller
├── rollback.service.ts             # Service logic
└── rollback.module.ts              # Module definition
```

## Testing

### Test Manual với cURL

#### Kiểm tra sức khỏe User Service
```bash
curl -X GET http://localhost:3000/rollback/user-service/health
```

#### Lấy trạng thái User Service
```bash
curl -X GET http://localhost:3000/rollback/user-service/status
```

#### Rollback thao tác User
```bash
curl -X POST http://localhost:3000/rollback/user-service/rollback-operation \
  -H "Content-Type: application/json" \
  -d '{
    "operationId": "test-operation-123",
    "reason": "Testing rollback functionality"
  }'
```

#### Đồng bộ dữ liệu
```bash
curl -X POST http://localhost:3000/rollback/user-service/sync-data \
  -H "Content-Type: application/json" \
  -d '{
    "syncType": "user-data",
    "timestamp": "2025-01-13T09:08:00.000Z"
  }'
```

## Error Handling

### Common Error Responses

#### Service Not Available
```json
{
  "success": false,
  "message": "User service is not responding",
  "error": "Connection timeout"
}
```

#### Invalid Operation
```json
{
  "success": false,
  "message": "Unknown rollback operation: invalid-operation",
  "error": "Unknown rollback operation: invalid-operation"
}
```

#### Missing Data
```json
{
  "success": false,
  "message": "Operation ID is required for rollback",
  "error": "Operation ID is required for rollback"
}
```

## Monitoring và Logging

### Log Messages

Auth Service logs:
- `🔄 Executing rollback operation: {operation}`
- `✅ User service restart command sent successfully`
- `❌ Rollback operation failed: {error}`

User Service logs:
- `🔄 Handling rollback command: {command}`
- `🏥 Performing health check...`
- `📊 Getting service status...`

### Health Check Response
```json
{
  "success": true,
  "message": "User service is healthy",
  "status": "UP",
  "timestamp": "2025-01-13T09:08:00.000Z",
  "uptime": 3600,
  "memory": {
    "rss": 50000000,
    "heapTotal": 20000000,
    "heapUsed": 15000000,
    "external": 1000000
  }
}
```

## Best Practices

### 1. **Error Handling**
- Luôn kiểm tra response success trước khi xử lý
- Log chi tiết các lỗi để debug
- Có fallback mechanism khi rollback thất bại

### 2. **Performance**
- Sử dụng timeout hợp lý cho các operations
- Cache health check results nếu cần
- Monitor memory usage và uptime

### 3. **Security**
- Validate input data trước khi gửi
- Log các rollback operations để audit
- Sử dụng authentication nếu cần

### 4. **Monitoring**
- Monitor rollback success rate
- Alert khi service health check thất bại
- Track rollback operation frequency

## Troubleshooting

### Common Issues

#### 1. **Connection Timeout**
- Kiểm tra RabbitMQ connection
- Verify service URLs và ports
- Check network connectivity

#### 2. **Message Pattern Not Found**
- Verify message pattern names
- Check service registration
- Ensure proper module imports

#### 3. **Service Not Responding**
- Check service health
- Verify service is running
- Check logs for errors

### Debug Commands

```bash
# Check RabbitMQ status
curl http://localhost:15672

# Check service health
curl http://localhost:3000/rollback/user-service/health
curl http://localhost:3001/rollback/user-service/health

# Check service status
curl http://localhost:3000/rollback/user-service/status
```

## Kết luận

Rollback functionality đã được implement thành công, cho phép Auth Service quản lý và rollback User Service thông qua:

- ✅ HTTP API endpoints
- ✅ RabbitMQ message patterns
- ✅ Health check và monitoring
- ✅ Error handling và logging
- ✅ Comprehensive testing

Auth Service giờ đây có thể rollback User Service một cách hiệu quả và đáng tin cậy.
