export interface MicroserviceConfig {
  name: string;
  host: string;
  port: number;
  transport: 'TCP' | 'REDIS' | 'NATS' | 'MQTT' | 'GRPC' | 'RMQ';
}

export interface RabbitMQConfig {
  url: string;
  queue: {
    auth: string;
    user: string;
  };
  exchange: {
    auth: string;
    user: string;
  };
  routingKey: {
    auth: string;
    user: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface MicroserviceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
