# Authentication API Documentation

## Overview
Authentication API cung cấp các chức năng đăng ký, đăng nhập, quản lý mật khẩu và xác thực token cho User Service.

## Base URL
- **HTTP REST API**: `http://localhost:3002/auth`
- **RabbitMQ Message Patterns**: `auth.*`

---

## 🔐 Authentication Endpoints

### 1. Register User
**Endpoint**: `POST /auth/register`

**Description**: Đăng ký user mới

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25
    },
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token",
    "expiresIn": 3600
  }
}
```

**RabbitMQ Pattern**: `auth.register`

---

### 2. Login User
**Endpoint**: `POST /auth/login`

**Description**: Đăng nhập user

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25
    },
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token",
    "expiresIn": 3600
  }
}
```

**RabbitMQ Pattern**: `auth.login`

---

### 3. Forgot Password
**Endpoint**: `POST /auth/forgot-password`

**Description**: Gửi email reset password

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "If the email exists, a password reset link has been sent"
}
```

**RabbitMQ Pattern**: `auth.forgot-password`

---

### 4. Reset Password
**Endpoint**: `POST /auth/reset-password`

**Description**: Reset password với token

**Request Body**:
```json
{
  "token": "reset-token",
  "newPassword": "newpassword123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Password has been reset successfully"
}
```

**RabbitMQ Pattern**: `auth.reset-password`

---

### 5. Validate Token
**Endpoint**: `POST /auth/validate-token`

**Description**: Xác thực JWT token

**Request Body**:
```json
{
  "token": "jwt-access-token"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Token validation result",
  "data": {
    "valid": true,
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25
    }
  }
}
```

**RabbitMQ Pattern**: `auth.validate-token`

---

### 6. Refresh Token
**Endpoint**: `POST /auth/refresh-token`

**Description**: Làm mới access token

**Request Body**:
```json
{
  "refreshToken": "jwt-refresh-token"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25
    },
    "accessToken": "new-jwt-access-token",
    "refreshToken": "new-jwt-refresh-token",
    "expiresIn": 3600
  }
}
```

**RabbitMQ Pattern**: `auth.refresh-token`

---

## 🔧 Configuration

### Environment Variables
```bash
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
```

### JWT Token Structure
```json
{
  "userId": "user-uuid",
  "email": "user@example.com",
  "type": "access|refresh",
  "iat": 1234567890,
  "exp": 1234567890
}
```

---

## 🧪 Testing

### Manual Testing với cURL
```bash
# Register
curl -X POST http://localhost:3002/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":25,"password":"password123"}'

# Login
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Validate Token
curl -X POST http://localhost:3002/auth/validate-token \
  -H "Content-Type: application/json" \
  -d '{"token":"your-jwt-token"}'
```

### Automated Testing
```bash
# Run authentication tests
node test-auth-api.js
```

---

## 🛡️ Security Features

### Password Security
- ✅ **bcrypt hashing** với salt rounds = 10
- ✅ **Password validation** (6-20 characters)
- ✅ **Email uniqueness** validation

### Token Security
- ✅ **JWT tokens** với secret key
- ✅ **Access token expiry** (1 hour default)
- ✅ **Refresh token expiry** (7 days default)
- ✅ **Token type validation**

### Input Validation
- ✅ **Email format** validation
- ✅ **Password length** validation
- ✅ **Name length** validation (2-50 characters)
- ✅ **Age range** validation (1-120)

---

## 📊 Error Handling

### Common Error Responses
```json
{
  "success": false,
  "message": "Error description",
  "error": "ErrorType",
  "statusCode": 400
}
```

### Error Types
- **ConflictException**: Email already exists
- **UnauthorizedException**: Invalid credentials
- **BadRequestException**: Invalid input data
- **NotFoundException**: User not found

---

## 🚀 Usage Examples

### Frontend Integration
```javascript
// Register
const register = async (userData) => {
  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Login
const login = async (credentials) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

// Validate Token
const validateToken = async (token) => {
  const response = await fetch('/auth/validate-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  });
  return response.json();
};
```

### Microservice Integration
```typescript
// Via RabbitMQ
const authService = {
  async register(userData) {
    return await this.microserviceService.sendRequest(
      'USER_SERVICE',
      'auth.register',
      userData
    );
  },
  
  async login(credentials) {
    return await this.microserviceService.sendRequest(
      'USER_SERVICE',
      'auth.login',
      credentials
    );
  }
};
```

---

## 📝 Notes

1. **Password Reset**: Hiện tại chỉ là mock implementation. Trong production cần:
   - Lưu reset token vào database
   - Gửi email thực tế
   - Implement token expiry

2. **Token Storage**: Refresh token nên được lưu trong database với expiry time

3. **Rate Limiting**: Nên implement rate limiting cho login/register endpoints

4. **Logging**: Tất cả authentication events đều được log

5. **Environment**: Đảm bảo JWT_SECRET được set trong production environment
