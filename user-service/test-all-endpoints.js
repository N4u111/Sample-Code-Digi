const { ClientProxyFactory, Transport } = require('@nestjs/microservices');

async function testAllEndpoints() {
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

    console.log('✅ Client created successfully!\n');

    // Test 1: Test endpoint
    console.log('🧪 Test 1: Testing user.test endpoint...');
    const testResult = await client.send('user.test', {}).toPromise();
    console.log('✅ Response:', JSON.stringify(testResult, null, 2));
    console.log('');

    // Test 2: Create user
    console.log('🧪 Test 2: Creating a new user...');
    const createUserData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      password: 'password123'
    };
    const createResult = await client.send('user.create', createUserData).toPromise();
    console.log('✅ Response:', JSON.stringify(createResult, null, 2));
    console.log('');

    // Test 3: Get all users
    console.log('🧪 Test 3: Getting all users...');
    const getAllResult = await client.send('user.findAll', {}).toPromise();
    console.log('✅ Response:', JSON.stringify(getAllResult, null, 2));
    console.log('');

    // Test 4: Get user by ID (if we have users)
    if (getAllResult.success && getAllResult.data && getAllResult.data.length > 0) {
      const userId = getAllResult.data[0].id;
      console.log(`🧪 Test 4: Getting user by ID: ${userId}...`);
      const getByIdResult = await client.send('user.findById', { id: userId }).toPromise();
      console.log('✅ Response:', JSON.stringify(getByIdResult, null, 2));
      console.log('');

      // Test 5: Update user
      console.log(`🧪 Test 5: Updating user: ${userId}...`);
      const updateData = {
        id: userId,
        updateData: {
          name: 'John Updated',
          age: 31
        }
      };
      const updateResult = await client.send('user.update', updateData).toPromise();
      console.log('✅ Response:', JSON.stringify(updateResult, null, 2));
      console.log('');

      // Test 6: Delete user
      console.log(`🧪 Test 6: Deleting user: ${userId}...`);
      const deleteResult = await client.send('user.delete', { id: userId }).toPromise();
      console.log('✅ Response:', JSON.stringify(deleteResult, null, 2));
    }

    await client.close();
    console.log('\n🔌 Client closed');
    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testAllEndpoints();
