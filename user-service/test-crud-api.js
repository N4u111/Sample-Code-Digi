const axios = require('axios');

const BASE_URL = 'http://localhost:3002';

async function testUserCRUD() {
  console.log('🚀 Testing User Service CRUD API...\n');

  try {
    // Test 1: Create User
    console.log('1️⃣ Creating a new user...');
    const createResponse = await axios.post(`${BASE_URL}/users`, {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 25,
      password: 'password123'
    });
    
    const userId = createResponse.data.id;
    console.log('✅ User created successfully:', createResponse.data);
    console.log('');

    // Test 2: Get All Users
    console.log('2️⃣ Getting all users...');
    const getAllResponse = await axios.get(`${BASE_URL}/users`);
    console.log('✅ Users retrieved:', getAllResponse.data.length, 'users found');
    console.log('');

    // Test 3: Get User by ID
    console.log('3️⃣ Getting user by ID...');
    const getByIdResponse = await axios.get(`${BASE_URL}/users/${userId}`);
    console.log('✅ User retrieved by ID:', getByIdResponse.data);
    console.log('');

    // Test 4: Update User
    console.log('4️⃣ Updating user...');
    const updateResponse = await axios.put(`${BASE_URL}/users/${userId}`, {
      name: 'John Smith',
      age: 26
    });
    console.log('✅ User updated successfully:', updateResponse.data);
    console.log('');

    // Test 5: Get Updated User
    console.log('5️⃣ Getting updated user...');
    const getUpdatedResponse = await axios.get(`${BASE_URL}/users/${userId}`);
    console.log('✅ Updated user retrieved:', getUpdatedResponse.data);
    console.log('');

    // Test 6: Delete User
    console.log('6️⃣ Deleting user...');
    await axios.delete(`${BASE_URL}/users/${userId}`);
    console.log('✅ User deleted successfully');
    console.log('');

    // Test 7: Verify Deletion
    console.log('7️⃣ Verifying deletion...');
    try {
      await axios.get(`${BASE_URL}/users/${userId}`);
      console.log('❌ User still exists (unexpected)');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('✅ User successfully deleted (404 Not Found)');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n🎉 All CRUD tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Test error cases
async function testErrorCases() {
  console.log('\n🔍 Testing error cases...\n');

  try {
    // Test duplicate email
    console.log('1️⃣ Testing duplicate email...');
    await axios.post(`${BASE_URL}/users`, {
      name: 'Jane Doe',
      email: 'john.doe@example.com', // Same email as before
      age: 30,
      password: 'password456'
    });
    console.log('❌ Duplicate email should have failed');
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.log('✅ Duplicate email correctly rejected (409 Conflict)');
    } else {
      console.log('❌ Unexpected error for duplicate email:', error.response?.data || error.message);
    }
  }

  try {
    // Test invalid email
    console.log('2️⃣ Testing invalid email...');
    await axios.post(`${BASE_URL}/users`, {
      name: 'Invalid User',
      email: 'invalid-email',
      age: 25,
      password: 'password123'
    });
    console.log('❌ Invalid email should have failed');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('✅ Invalid email correctly rejected (400 Bad Request)');
    } else {
      console.log('❌ Unexpected error for invalid email:', error.response?.data || error.message);
    }
  }

  try {
    // Test invalid age
    console.log('3️⃣ Testing invalid age...');
    await axios.post(`${BASE_URL}/users`, {
      name: 'Invalid Age User',
      email: 'age@example.com',
      age: 150, // Invalid age
      password: 'password123'
    });
    console.log('❌ Invalid age should have failed');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('✅ Invalid age correctly rejected (400 Bad Request)');
    } else {
      console.log('❌ Unexpected error for invalid age:', error.response?.data || error.message);
    }
  }

  try {
    // Test non-existent user
    console.log('4️⃣ Testing non-existent user...');
    await axios.get(`${BASE_URL}/users/non-existent-id`);
    console.log('❌ Non-existent user should have failed');
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('✅ Non-existent user correctly rejected (404 Not Found)');
    } else {
      console.log('❌ Unexpected error for non-existent user:', error.response?.data || error.message);
    }
  }

  console.log('\n🎉 Error case tests completed!');
}

// Run tests
async function runTests() {
  console.log('='.repeat(50));
  console.log('🧪 USER SERVICE CRUD API TEST SUITE');
  console.log('='.repeat(50));
  
  await testUserCRUD();
  await testErrorCases();
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ ALL TESTS COMPLETED');
  console.log('='.repeat(50));
}

// Check if service is running
async function checkService() {
  try {
    await axios.get(`${BASE_URL}/users`);
    return true;
  } catch (error) {
    console.log('❌ User Service is not running on', BASE_URL);
    console.log('Please start the service with: npm run start:dev');
    return false;
  }
}

// Main execution
async function main() {
  const isRunning = await checkService();
  if (isRunning) {
    await runTests();
  }
}

main().catch(console.error);
