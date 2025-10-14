const amqp = require('amqplib');

async function testSimpleRabbitMQ() {
  try {
    console.log('Connecting to RabbitMQ...');
    const connection = await amqp.connect('amqp://admin:admin123@localhost:5672');
    const channel = await connection.createChannel();

    const queue = 'user_service_queue';
    await channel.assertQueue(queue, { durable: true });

    console.log('✅ Connected to RabbitMQ successfully!');
    console.log('📋 Queue:', queue);

    // Test message
    const testMessage = {
      pattern: 'user.test',
      data: {}
    };

    const correlationId = 'test-' + Date.now();
    const replyQueue = await channel.assertQueue('', { exclusive: true });

    console.log('\n🚀 Sending test message...');

    // Set up response handler
    const responsePromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('❌ Timeout waiting for response (5 seconds)'));
      }, 5000);

      channel.consume(replyQueue.queue, (msg) => {
        if (msg && msg.properties.correlationId === correlationId) {
          clearTimeout(timeout);
          resolve(JSON.parse(msg.content.toString()));
        }
      }, { noAck: true });
    });

    // Send message
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(testMessage)), {
      correlationId: correlationId,
      replyTo: replyQueue.queue
    });

    console.log('⏳ Waiting for response...');
    const response = await responsePromise;
    
    console.log('\n✅ Response received:');
    console.log(JSON.stringify(response, null, 2));

    // Close connection
    await channel.close();
    await connection.close();
    console.log('\n🔌 Connection closed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Make sure RabbitMQ is running:');
      console.log('   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management');
      console.log('   Default credentials: admin/admin123');
    }
    
    process.exit(1);
  }
}

// Run the test
console.log('🧪 Testing RabbitMQ connection to user-service...\n');
testSimpleRabbitMQ();
