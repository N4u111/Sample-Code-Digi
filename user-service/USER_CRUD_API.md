# User Service CRUD API Documentation

## Tổng quan

User Service cung cấp đầy đủ các chức năng CRUD (Create, Read, Update, Delete) cho User entity thông qua cả HTTP REST API và RabbitMQ Message Patterns.

## HTTP REST API Endpoints

### Base URL
```
http://localhost:3002
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

## RabbitMQ Message Patterns

### Queue Configuration
- **Queue Name:** `user_service_queue`
- **Exchange:** `user_service_exchange`
- **Routing Keys:** `user.*`

### 1. Tạo User
```json
{
  "pattern": "user.create",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "password": "password123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Lấy tất cả Users
```json
{
  "pattern": "user.findAll",
  "data": {}
}
```

### 3. Lấy User theo ID
```json
{
  "pattern": "user.findById",
  "data": {
    "id": "uuid"
  }
}
```

### 4. Cập nhật User
```json
{
  "pattern": "user.update",
  "data": {
    "id": "uuid",
    "updateData": {
      "name": "John Smith",
      "age": 26
    }
  }
}
```

### 5. Xóa User
```json
{
  "pattern": "user.delete",
  "data": {
    "id": "uuid"
  }
}
```

## Validation Rules

### CreateUserDto
- `name`: Required, string
- `email`: Required, valid email format, unique
- `age`: Required, integer, min: 1, max: 120
- `password`: Required, string

### UpdateUserDto
- `name`: Optional, string
- `email`: Optional, valid email format, unique
- `age`: Optional, integer, min: 1, max: 120
- `password`: Optional, string

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["Validation error messages"],
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "User with id {id} not found",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

## Security Features

1. **Password Hashing**: Tất cả passwords được hash bằng bcrypt với salt rounds = 10
2. **Email Uniqueness**: Email phải unique trong hệ thống
3. **Input Validation**: Tất cả inputs được validate bằng class-validator
4. **Error Handling**: Comprehensive error handling với proper HTTP status codes

## Database Schema

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

## Testing

### Test với cURL
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

## Architecture

User Service được xây dựng theo Clean Architecture pattern:

- **Domain Layer**: Entities, Interfaces, Tokens
- **Application Layer**: Use Cases, DTOs
- **Infrastructure Layer**: Database, Repositories
- **Presentation Layer**: Controllers (HTTP & Message)

## Dependencies

- **NestJS**: Framework chính
- **Prisma**: ORM cho database operations
- **bcrypt**: Password hashing
- **class-validator**: Input validation
- **RabbitMQ**: Message broker cho microservices communication
