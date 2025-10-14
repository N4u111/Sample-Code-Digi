export declare class SimpleTcpExample {
    private readonly logger;
    private authClient;
    constructor();
    connect(): Promise<void>;
    sendLoginRequest(): Promise<any>;
    disconnect(): Promise<void>;
}
