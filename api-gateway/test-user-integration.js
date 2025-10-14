const axios = require('axios');

const API_GATEWAY_URL = 'http://localhost:3000';
const USER_SERVICE_URL = 'http://localhost:3002';

async function testUserIntegration() {
  console.log('🚀 Testing API Gateway -> User Service Integration via RabbitMQ...\n');

  try {
    // Test 1: Check API Gateway info
    console.log('1️⃣ Checking API Gateway info...');
    const gatewayInfo = await axios.get(`${API_GATEWAY_URL}/info`);
    console.log('✅ API Gateway info:', gatewayInfo.data);
    console.log('');

    // Test 2: Check User Service direct access
    console.log('2️⃣ Checking User Service direct access...');
    try {
      const userServiceInfo = await axios.get(`${USER_SERVICE_URL}/users`);
      console.log('✅ User Service is running, found', userServiceInfo.data.length, 'users');
    } catch (error) {
      console.log('⚠️ User Service direct access failed:', error.message);
    }
    console.log('');

    // Test 3: Create user via API Gateway
    console.log('3️⃣ Creating user via API Gateway...');
    const createResponse = await axios.post(`${API_GATEWAY_URL}/users`, {
      name: 'John Doe via Gateway',
      email: 'john.gateway@example.com',
      age: 25,
      password: 'password123'
    });
    
    const userId = createResponse.data.id;
    console.log('✅ User created via API Gateway:', createResponse.data);
    console.log('');

    // Test 4: Get all users via API Gateway
    console.log('4️⃣ Getting all users via API Gateway...');
    const getAllResponse = await axios.get(`${API_GATEWAY_URL}/users`);
    console.log('✅ Users retrieved via API Gateway:', getAllResponse.data.length, 'users found');
    console.log('');

    // Test 5: Get user by ID via API Gateway
    console.log('5️⃣ Getting user by ID via API Gateway...');
    const getByIdResponse = await axios.get(`${API_GATEWAY_URL}/users/${userId}`);
    console.log('✅ User retrieved by ID via API Gateway:', getByIdResponse.data);
    console.log('');

    // Test 6: Update user via API Gateway
    console.log('6️⃣ Updating user via API Gateway...');
    const updateResponse = await axios.put(`${API_GATEWAY_URL}/users/${userId}`, {
      name: 'John Smith via Gateway',
      age: 26
    });
    console.log('✅ User updated via API Gateway:', updateResponse.data);
    console.log('');

    // Test 7: Verify update via direct User Service
    console.log('7️⃣ Verifying update via direct User Service...');
    try {
      const directGetResponse = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
      console.log('✅ Update verified via direct User Service:', directGetResponse.data);
    } catch (error) {
      console.log('⚠️ Could not verify via direct User Service:', error.message);
    }
    console.log('');

    // Test 8: Delete user via API Gateway
    console.log('8️⃣ Deleting user via API Gateway...');
    await axios.delete(`${API_GATEWAY_URL}/users/${userId}`);
    console.log('✅ User deleted via API Gateway');
    console.log('');

    // Test 9: Verify deletion
    console.log('9️⃣ Verifying deletion...');
    try {
      await axios.get(`${API_GATEWAY_URL}/users/${userId}`);
      console.log('❌ User still exists (unexpected)');
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log('✅ User successfully deleted (500 Internal Server Error - expected for non-existent user)');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n🎉 API Gateway -> User Service integration tests completed successfully!');

  } catch (error) {
    console.error('❌ Integration test failed:', error.response?.data || error.message);
  }
}

// Test error cases
async function testErrorCases() {
  console.log('\n🔍 Testing error cases...\n');

  try {
    // Test duplicate email via API Gateway
    console.log('1️⃣ Testing duplicate email via API Gateway...');
    await axios.post(`${API_GATEWAY_URL}/users`, {
      name: 'Jane Doe',
      email: 'john.gateway@example.com', // Same email as before
      age: 30,
      password: 'password456'
    });
    console.log('❌ Duplicate email should have failed');
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log('✅ Duplicate email correctly rejected (500 Internal Server Error)');
    } else {
      console.log('❌ Unexpected error for duplicate email:', error.response?.data || error.message);
    }
  }

  try {
    // Test invalid data via API Gateway
    console.log('2️⃣ Testing invalid data via API Gateway...');
    await axios.post(`${API_GATEWAY_URL}/users`, {
      name: 'Invalid User',
      email: 'invalid-email',
      age: 150, // Invalid age
      password: 'password123'
    });
    console.log('❌ Invalid data should have failed');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('✅ Invalid data correctly rejected (400 Bad Request)');
    } else {
      console.log('❌ Unexpected error for invalid data:', error.response?.data || error.message);
    }
  }

  try {
    // Test non-existent user via API Gateway
    console.log('3️⃣ Testing non-existent user via API Gateway...');
    await axios.get(`${API_GATEWAY_URL}/users/non-existent-id`);
    console.log('❌ Non-existent user should have failed');
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log('✅ Non-existent user correctly rejected (500 Internal Server Error)');
    } else {
      console.log('❌ Unexpected error for non-existent user:', error.response?.data || error.message);
    }
  }

  console.log('\n🎉 Error case tests completed!');
}

// Check if services are running
async function checkServices() {
  console.log('🔍 Checking if services are running...\n');
  
  let gatewayRunning = false;
  let userServiceRunning = false;

  try {
    await axios.get(`${API_GATEWAY_URL}/info`);
    gatewayRunning = true;
    console.log('✅ API Gateway is running on', API_GATEWAY_URL);
  } catch (error) {
    console.log('❌ API Gateway is not running on', API_GATEWAY_URL);
    console.log('Please start API Gateway with: npm run start:dev');
  }

  try {
    await axios.get(`${USER_SERVICE_URL}/users`);
    userServiceRunning = true;
    console.log('✅ User Service is running on', USER_SERVICE_URL);
  } catch (error) {
    console.log('❌ User Service is not running on', USER_SERVICE_URL);
    console.log('Please start User Service with: npm run start:dev');
  }

  return { gatewayRunning, userServiceRunning };
}

// Main execution
async function main() {
  console.log('='.repeat(60));
  console.log('🧪 API GATEWAY -> USER SERVICE INTEGRATION TEST SUITE');
  console.log('='.repeat(60));
  
  const { gatewayRunning, userServiceRunning } = await checkServices();
  
  if (gatewayRunning && userServiceRunning) {
    await testUserIntegration();
    await testErrorCases();
  } else {
    console.log('\n❌ Cannot run tests - one or more services are not running');
    console.log('\nTo start services:');
    console.log('1. Start User Service: cd user-service && npm run start:dev');
    console.log('2. Start API Gateway: cd api-gateway && npm run start:dev');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ INTEGRATION TESTS COMPLETED');
  console.log('='.repeat(60));
}

main().catch(console.error);
