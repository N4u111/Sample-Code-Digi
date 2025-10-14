# API Gateway Endpoints Test

## Base URL: http://localhost:3000

### Roles Endpoints
- `GET /roles` - Lấy tất cả roles
- `GET /roles/:id` - Lấy role theo ID
- `POST /roles` - Tạo role mới
- `PUT /roles/:id` - Cập nhật role
- `DELETE /roles/:id` - Xóa role

### Permissions Endpoints
- `GET /permissions` - Lấy tất cả permissions
- `GET /permissions/:id` - Lấy permission theo ID
- `POST /permissions` - Tạo permission mới
- `PUT /permissions/:id` - Cập nhật permission
- `DELETE /permissions/:id` - Xóa permission

### Groups Endpoints
- `GET /groups` - Lấy tất cả groups
- `GET /groups/:id` - Lấy group theo ID
- `POST /groups` - Tạo group mới
- `PUT /groups/:id` - Cập nhật group
- `DELETE /groups/:id` - Xóa group

### Users Endpoints (existing)
- `GET /users` - Lấy tất cả users
- `GET /users/:id` - Lấy user theo ID
- `POST /users` - Tạo user mới
- `PUT /users/:id` - Cập nhật user
- `DELETE /users/:id` - Xóa user

## Test Examples

### Create Role
```bash
curl -X POST http://localhost:3000/roles \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Role", "slug": "test-role"}'
```

### Create Permission
```bash
curl -X POST http://localhost:3000/permissions \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Permission", "code": "test:permission"}'
```

### Create Group
```bash
curl -X POST http://localhost:3000/groups \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Group", "slug": "test-group"}'
```
