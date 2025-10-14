"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    authService: {
        host: process.env.AUTH_SERVICE_HOST || 'localhost',
        port: parseInt(process.env.AUTH_SERVICE_PORT || '3001'),
    },
    userService: {
        host: process.env.USER_SERVICE_HOST || 'localhost',
        port: parseInt(process.env.USER_SERVICE_PORT || '3002'),
    },
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'debug',
};
//# sourceMappingURL=environment.js.map