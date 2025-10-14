export const environment = {
  // Microservice Configuration
  authService: {
    host: process.env.AUTH_SERVICE_HOST || 'localhost',
    port: parseInt(process.env.AUTH_SERVICE_PORT || '3001'),
  },
  userService: {
    host: process.env.USER_SERVICE_HOST || 'localhost',
    port: parseInt(process.env.USER_SERVICE_PORT || '3002'),
  },
  
  // API Gateway Configuration
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'debug',
};
