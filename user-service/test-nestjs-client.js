const { ClientProxyFactory, Transport } = require('@nestjs/microservices');

async function testNestJSClient() {
  try {
    console.log('🔧 Creating NestJS Client...');
    
    const client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@localhost:5672'],
        queue: 'user_service_queue',
        queueOptions: {
          durable: true,
        },
      },
    });

    console.log('✅ Client created successfully!');
    console.log('🚀 Sending test message...');

    // Send test message
    const result = await client.send('user.test', {}).toPromise();
    
    console.log('✅ Response received:');
    console.log(JSON.stringify(result, null, 2));

    await client.close();
    console.log('🔌 Client closed');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testNestJSClient();
