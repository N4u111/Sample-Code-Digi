const amqp = require('amqplib');

async function debugRabbitMQ() {
  try {
    console.log('🔍 Debugging RabbitMQ connection...');
    
    const connection = await amqp.connect('amqp://admin:admin123@localhost:5672');
    const channel = await connection.createChannel();

    const queue = 'user_service_queue';
    
    // Check if queue exists
    const queueInfo = await channel.checkQueue(queue);
    console.log('📋 Queue info:', queueInfo);

    // Listen for messages on the queue
    console.log('👂 Listening for messages on queue...');
    
    await channel.consume(queue, (msg) => {
      if (msg) {
        console.log('📨 Received message:');
        console.log('  Content:', msg.content.toString());
        console.log('  Properties:', msg.properties);
        console.log('  Fields:', msg.fields);
        
        // Acknowledge the message
        channel.ack(msg);
      }
    }, { noAck: false });

    // Send a test message
    console.log('📤 Sending test message...');
    const testMessage = {
      pattern: 'user.test',
      data: {}
    };

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(testMessage)), {
      persistent: true
    });

    console.log('✅ Message sent! Waiting for response...');
    
    // Wait for a while to see if we get a response
    setTimeout(async () => {
      await channel.close();
      await connection.close();
      console.log('🔌 Connection closed');
      process.exit(0);
    }, 10000);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

debugRabbitMQ();
