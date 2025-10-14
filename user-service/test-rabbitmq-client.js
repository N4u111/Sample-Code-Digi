const amqp = require('amqplib');

async function testRabbitMQ() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://admin:admin123@localhost:5672');
    const channel = await connection.createChannel();

    // Declare the queue
    const queue = 'user_service_queue';
    await channel.assertQueue(queue, { durable: true });

    console.log('Connected to RabbitMQ successfully!');
    console.log('Queue:', queue);

    // Test 1: Send test message
    console.log('\n=== Test 1: Sending test message ===');
    const testMessage = {
      pattern: 'user.test',
      data: {}
    };

    const correlationId = 'test-' + Date.now();
    const replyQueue = await channel.assertQueue('', { exclusive: true });

    // Set up response handler
    const responsePromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout waiting for response'));
      }, 5000);

      channel.consume(replyQueue.queue, (msg) => {
        if (msg.properties.correlationId === correlationId) {
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

    console.log('Sent test message, waiting for response...');
    const response = await responsePromise;
    console.log('Response:', JSON.stringify(response, null, 2));

    // Test 2: Send create user message
    console.log('\n=== Test 2: Sending create user message ===');
    const createUserMessage = {
      pattern: 'user.create',
      data: {
        name: 'Test User',
        email: 'test@example.com',
        age: 25,
        password: 'password123'
      }
    };

    const correlationId2 = 'create-' + Date.now();
    const replyQueue2 = await channel.assertQueue('', { exclusive: true });

    const responsePromise2 = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout waiting for response'));
      }, 5000);

      channel.consume(replyQueue2.queue, (msg) => {
        if (msg.properties.correlationId === correlationId2) {
          clearTimeout(timeout);
          resolve(JSON.parse(msg.content.toString()));
        }
      }, { noAck: true });
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(createUserMessage)), {
      correlationId: correlationId2,
      replyTo: replyQueue2.queue
    });

    console.log('Sent create user message, waiting for response...');
    const response2 = await responsePromise2;
    console.log('Response:', JSON.stringify(response2, null, 2));

    // Test 3: Send get all users message
    console.log('\n=== Test 3: Sending get all users message ===');
    const getAllUsersMessage = {
      pattern: 'user.findAll',
      data: {}
    };

    const correlationId3 = 'findAll-' + Date.now();
    const replyQueue3 = await channel.assertQueue('', { exclusive: true });

    const responsePromise3 = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout waiting for response'));
      }, 5000);

      channel.consume(replyQueue3.queue, (msg) => {
        if (msg.properties.correlationId === correlationId3) {
          clearTimeout(timeout);
          resolve(JSON.parse(msg.content.toString()));
        }
      }, { noAck: true });
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(getAllUsersMessage)), {
      correlationId: correlationId3,
      replyTo: replyQueue3.queue
    });

    console.log('Sent get all users message, waiting for response...');
    const response3 = await responsePromise3;
    console.log('Response:', JSON.stringify(response3, null, 2));

    // Close connection
    await channel.close();
    await connection.close();
    console.log('\nConnection closed successfully!');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the test
testRabbitMQ();
