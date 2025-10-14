# Rate Limiting System

## Overview

Hệ thống Rate Limiting được thiết kế để bảo vệ API khỏi abuse và đảm bảo fair usage. Hệ thống sử dụng in-memory storage với automatic cleanup để quản lý rate limits.

## Architecture

### Components

1. **RateLimitService** - Core service quản lý rate limiting logic
2. **RateLimitGuard** - Guard để protect endpoints
3. **RateLimit Decorator** - Decorator để configure rate limits
4. **Rate Limit Headers** - HTTP headers cho client information

### Configuration Types

| Type | Window | Max Requests | Key Strategy | Use Case |
|------|--------|--------------|--------------|----------|
| `login` | 15 minutes | 5 | IP + Email | Prevent brute force attacks |
| `register` | 1 hour | 3 | IP only | Prevent spam registrations |
| `refresh` | 1 minute | 10 | IP only | Prevent token refresh abuse |
| `general` | 1 minute | 100 | IP only | General API protection |

## Usage

### Basic Usage

```typescript
import { RateLimitGuard } from '../shared/common/guards';
import { RateLimit } from '../shared/common/decorators';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(RateLimitGuard)
  @RateLimit({ configType: 'login' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
```

### Custom Configuration

```typescript
@Post('sensitive-endpoint')
@UseGuards(RateLimitGuard)
@RateLimit({
  configType: 'custom',
  customConfig: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 2, // 2 requests per 5 minutes
    keyGenerator: (request) => `custom:${request.ip}:${request.user?.id}`,
  }
})
async sensitiveOperation() {
  // Implementation
}
```

## Rate Limit Headers

Mỗi response sẽ include các headers sau:

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 2025-10-10T09:00:00.000Z
Retry-After: 900 (khi bị rate limited)
```

## Error Response

Khi rate limit bị exceeded:

```json
{
  "success": false,
  "message": "Too many requests. Please try again later.",
  "error": "RateLimitExceeded",
  "statusCode": 429,
  "retryAfter": 900
}
```

## Monitoring

### Rate Limit Status Endpoint

```bash
GET /auth/rate-limit-status
```

Response:
```json
{
  "success": true,
  "message": "Rate limit status retrieved successfully",
  "data": {
    "login": {
      "limit": 5,
      "remaining": 3,
      "resetTime": 1728561600000
    },
    "register": {
      "limit": 3,
      "remaining": 2,
      "resetTime": 1728565200000
    },
    "refresh": {
      "limit": 10,
      "remaining": 8,
      "resetTime": 1728561000000
    },
    "storeSize": 15
  }
}
```

## Key Generation Strategies

### Login Rate Limiting
- **Key**: `login:IP:EMAIL`
- **Purpose**: Prevent brute force attacks on specific accounts
- **Example**: `login:192.168.1.1:user@example.com`

### Register Rate Limiting
- **Key**: `register:IP`
- **Purpose**: Prevent spam registrations from same IP
- **Example**: `register:192.168.1.1`

### Refresh Token Rate Limiting
- **Key**: `refresh:IP`
- **Purpose**: Prevent token refresh abuse
- **Example**: `refresh:192.168.1.1`

### General Rate Limiting
- **Key**: `general:IP`
- **Purpose**: General API protection
- **Example**: `general:192.168.1.1`

## Memory Management

- **Automatic Cleanup**: Expired entries được tự động xóa
- **Memory Efficient**: Chỉ lưu active rate limit entries
- **Monitoring**: `getStoreSize()` để monitor memory usage

## Security Considerations

1. **IP Spoofing**: Rate limiting dựa trên IP có thể bị bypass
2. **Distributed Attacks**: Single server rate limiting không protect khỏi distributed attacks
3. **Legitimate Users**: Có thể block legitimate users nếu share IP

## Best Practices

1. **Gradual Rollout**: Implement rate limiting gradually
2. **Monitor Metrics**: Track rate limit violations
3. **Adjust Limits**: Fine-tune limits based on usage patterns
4. **User Communication**: Inform users về rate limits
5. **Graceful Degradation**: Provide fallback mechanisms

## Testing

### Test Rate Limiting

```bash
# Test login rate limiting
for i in {1..6}; do
  curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}'
done

# Check rate limit status
curl http://localhost:3000/auth/rate-limit-status
```

### Expected Behavior

1. **First 5 requests**: Should work normally
2. **6th request**: Should return 429 Too Many Requests
3. **Headers**: Should include rate limit information
4. **Retry After**: Should indicate when to retry

## Configuration

### Environment Variables

```env
# Rate limiting can be configured via environment variables
RATE_LIMIT_LOGIN_MAX=5
RATE_LIMIT_LOGIN_WINDOW=900000
RATE_LIMIT_REGISTER_MAX=3
RATE_LIMIT_REGISTER_WINDOW=3600000
```

### Custom Key Generators

```typescript
// Custom key generator for user-based rate limiting
const userBasedKeyGenerator = (request) => {
  const userId = request.user?.id || 'anonymous';
  const endpoint = request.route?.path || 'unknown';
  return `${endpoint}:user:${userId}`;
};

// Custom key generator for API key based rate limiting
const apiKeyBasedKeyGenerator = (request) => {
  const apiKey = request.headers['x-api-key'] || 'no-key';
  return `api:${apiKey}`;
};
```

## Integration với Microservices

Rate limiting được implement ở API Gateway level, không ảnh hưởng đến microservices:

1. **API Gateway**: Handles rate limiting
2. **Auth Service**: Processes authentication requests
3. **User Service**: Manages user data
4. **RabbitMQ**: Communication between services

## Future Enhancements

1. **Redis Integration**: Distributed rate limiting
2. **Dynamic Configuration**: Runtime rate limit adjustments
3. **Advanced Analytics**: Rate limit violation analytics
4. **Whitelist/Blacklist**: IP-based allow/deny lists
5. **Rate Limit Bypass**: Admin override capabilities
