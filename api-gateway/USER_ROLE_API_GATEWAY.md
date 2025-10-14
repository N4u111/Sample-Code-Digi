# User-Role API Gateway Documentation

## Tổng quan
API Gateway endpoints để quản lý mối quan hệ giữa User và Role thông qua user-service.

## Base URL: `http://localhost:3000/users`

## API Endpoints

### 1. **POST /users/:id/roles** - Gán role cho user
```http
POST /users/{userId}/roles
Content-Type: application/json

{
  "roleId": "role_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role assigned to user successfully",
  "data": {
    "userId": "user_id",
    "roleId": "role_id",
    "assignedAt": "2025-01-01T00:00:00.000Z",
    "role": {
      "id": "role_id",
      "name": "admin",
      "slug": "admin"
    },
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 2. **DELETE /users/:id/roles/:roleId** - Xóa role khỏi user
```http
DELETE /users/{userId}/roles/{roleId}
```

**Response:**
```json
{
  "success": true,
  "message": "Role removed from user successfully",
  "data": null
}
```

### 3. **GET /users/:id/roles** - Lấy tất cả roles của user
```http
GET /users/{userId}/roles
```

**Response:**
```json
{
  "success": true,
  "message": "User roles retrieved successfully",
  "data": [
    {
      "id": "role_id",
      "name": "admin",
      "slug": "admin",
      "assignedAt": "2025-01-01T00:00:00.000Z",
      "permissions": [
        {
          "id": "permission_id",
          "name": "read_users",
          "code": "READ_USERS",
          "grantedAt": "2025-01-01T00:00:00.000Z"
        }
      ]
    }
  ]
}
```

### 4. **POST /users/:id/roles/bulk** - Gán nhiều roles cho user
```http
POST /users/{userId}/roles/bulk
Content-Type: application/json

{
  "roleIds": ["role_id_1", "role_id_2", "role_id_3"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bulk assign roles completed. 2 assigned, 1 skipped, 0 errors",
  "data": {
    "assigned": [
      {
        "userId": "user_id",
        "roleId": "role_id_1",
        "assignedAt": "2025-01-01T00:00:00.000Z",
        "role": {
          "id": "role_id_1",
          "name": "admin",
          "slug": "admin"
        },
        "user": {
          "id": "user_id",
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    ],
    "skipped": [
      {
        "roleId": "role_id_2",
        "reason": "User already has this role"
      }
    ],
    "errors": [
      {
        "roleId": "invalid_role_id",
        "reason": "Role not found"
      }
    ]
  }
}
```

## DTOs

### AssignRoleToUserDto
```typescript
{
  userId: string;  // From URL parameter
  roleId: string;  // From request body
}
```

### RemoveRoleFromUserDto
```typescript
{
  userId: string;  // From URL parameter
  roleId: string;  // From URL parameter
}
```

### GetUserRolesDto
```typescript
{
  userId: string;  // From URL parameter
}
```

### BulkAssignRolesToUserDto
```typescript
{
  userId: string;    // From URL parameter
  roleIds: string[]; // From request body
}
```

## Validation Rules

### Assign Role
- `userId`: Required, non-empty string
- `roleId`: Required, non-empty string

### Remove Role
- `userId`: Required, non-empty string
- `roleId`: Required, non-empty string

### Get User Roles
- `userId`: Required, non-empty string

### Bulk Assign Roles
- `userId`: Required, non-empty string
- `roleIds`: Required, non-empty array of strings

## Error Handling

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "roleId is required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found",
  "error": "User with id 'xxx' not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "User already has this role",
  "error": "User already has this role"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Database connection failed"
}
```

## Testing với cURL

### Gán role cho user
```bash
curl -X POST http://localhost:3000/users/user_id/roles \
  -H "Content-Type: application/json" \
  -d '{
    "roleId": "role_id"
  }'
```

### Xóa role khỏi user
```bash
curl -X DELETE http://localhost:3000/users/user_id/roles/role_id
```

### Lấy roles của user
```bash
curl -X GET http://localhost:3000/users/user_id/roles
```

### Gán nhiều roles cho user
```bash
curl -X POST http://localhost:3000/users/user_id/roles/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "roleIds": ["role_id_1", "role_id_2", "role_id_3"]
  }'
```

## Luồng hoạt động

1. **Client** gửi HTTP request đến API Gateway
2. **UserController** nhận request và validate input
3. **UserService** xử lý business logic
4. **MicroserviceService** gửi message qua RabbitMQ đến **USER_SERVICE**
5. **UserController** trong user-service nhận message pattern
6. **Use Cases** xử lý business logic
7. **PrismaUserRepository** thao tác với database
8. **Response** được trả về qua cùng luồng

## Message Patterns

| HTTP Method | Endpoint | Message Pattern |
|-------------|----------|-----------------|
| POST | `/users/:id/roles` | `user.assignRole` |
| DELETE | `/users/:id/roles/:roleId` | `user.removeRole` |
| GET | `/users/:id/roles` | `user.getRoles` |
| POST | `/users/:id/roles/bulk` | `user.bulkAssignRoles` |

## Best Practices

1. **URL Design**: Sử dụng RESTful URLs với resource hierarchy
2. **Validation**: Validate input ở cả API Gateway và user-service
3. **Error Handling**: Trả về error messages rõ ràng
4. **Logging**: Log tất cả operations để debug
5. **Response Format**: Sử dụng format response nhất quán

## Security Considerations

1. **Authentication**: Đảm bảo user đã đăng nhập
2. **Authorization**: Kiểm tra quyền gán/xóa roles
3. **Input Validation**: Validate tất cả input parameters
4. **Rate Limiting**: Giới hạn số lượng requests
5. **Audit Log**: Log tất cả role assignments để audit

## Performance Tips

1. **Bulk Operations**: Sử dụng bulk assign cho nhiều roles
2. **Caching**: Cache user roles nếu cần
3. **Database Indexing**: Đảm bảo indexes cho user_id và role_id
4. **Connection Pooling**: Sử dụng connection pooling cho database
5. **Async Processing**: Xử lý async cho bulk operations
