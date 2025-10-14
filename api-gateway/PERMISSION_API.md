# Permission API - User Service

## Tổng quan
Permission service trong API Gateway gọi qua CRUD của user-service để quản lý quyền hạn.

## API Endpoints

### Base URL: `http://localhost:3000/permissions`

### 1. **GET /permissions** - Lấy tất cả permissions
```http
GET /permissions
```

**Response:**
```json
{
  "success": true,
  "message": "Permissions retrieved successfully",
  "data": [
    {
      "id": "permission_id",
      "name": "read_users",
      "description": "Read user information",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. **GET /permissions/:id** - Lấy permission theo ID
```http
GET /permissions/permission_id
```

**Response:**
```json
{
  "success": true,
  "message": "Permission retrieved successfully",
  "data": {
    "id": "permission_id",
    "name": "read_users",
    "description": "Read user information",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### 3. **POST /permissions** - Tạo permission mới
```http
POST /permissions
Content-Type: application/json

{
  "name": "write_users",
  "description": "Create and update user information"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Permission created successfully",
  "data": {
    "id": "new_permission_id",
    "name": "write_users",
    "description": "Create and update user information",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### 4. **PUT /permissions/:id** - Cập nhật permission
```http
PUT /permissions/permission_id
Content-Type: application/json

{
  "name": "update_users",
  "description": "Update user information only"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Permission updated successfully",
  "data": {
    "id": "permission_id",
    "name": "update_users",
    "description": "Update user information only",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### 5. **DELETE /permissions/:id** - Xóa permission
```http
DELETE /permissions/permission_id
```

**Response:**
```json
{
  "success": true,
  "message": "Permission deleted successfully"
}
```

## Cấu trúc dữ liệu

### CreatePermissionDto
```typescript
{
  name: string;        // Tên permission (required)
  description: string; // Mô tả permission (required)
}
```

### UpdatePermissionDto
```typescript
{
  name?: string;        // Tên permission (optional)
  description?: string; // Mô tả permission (optional)
}
```

### PermissionResponseDto
```typescript
{
  id: string;           // ID của permission
  name: string;         // Tên permission
  description: string;  // Mô tả permission
  createdAt: Date;      // Ngày tạo
  updatedAt: Date;      // Ngày cập nhật
}
```

## Luồng hoạt động

1. **API Gateway** nhận request từ client
2. **PermissionService** trong API Gateway xử lý request
3. **MicroserviceService** gửi message qua RabbitMQ đến **USER_SERVICE**
4. **PermissionController** trong user-service nhận message
5. **Use Cases** xử lý business logic
6. **PrismaPermissionRepository** thao tác với database
7. Response được trả về qua cùng luồng

## Error Handling

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "name is required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Permission not found",
  "error": "Permission with id 'xxx' not found"
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

### Lấy tất cả permissions
```bash
curl -X GET http://localhost:3000/permissions
```

### Tạo permission mới
```bash
curl -X POST http://localhost:3000/permissions \
  -H "Content-Type: application/json" \
  -d '{
    "name": "delete_users",
    "description": "Delete user accounts"
  }'
```

### Cập nhật permission
```bash
curl -X PUT http://localhost:3000/permissions/permission_id \
  -H "Content-Type: application/json" \
  -d '{
    "name": "manage_users",
    "description": "Full user management"
  }'
```

### Xóa permission
```bash
curl -X DELETE http://localhost:3000/permissions/permission_id
```
