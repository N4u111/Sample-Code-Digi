const axios = require('axios');

const BASE_URL = 'http://localhost:3002';

// Test data
const testUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 25,
  password: 'password123'
};

const loginData = {
  email: 'john.doe@example.com',
  password: 'password123'
};

async function testAuthEndpoints() {
  console.log('🧪 Testing Authentication Endpoints...\n');

  try {
    // Test 1: Register new user
    console.log('1️⃣ Testing Register...');
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, testUser);
    console.log('✅ Register Success:', registerResponse.data);
    console.log('Access Token:', registerResponse.data.data.accessToken.substring(0, 50) + '...');
    console.log('Refresh Token:', registerResponse.data.data.refreshToken.substring(0, 50) + '...\n');

    // Test 2: Login with existing user
    console.log('2️⃣ Testing Login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log('✅ Login Success:', loginResponse.data);
    console.log('Access Token:', loginResponse.data.data.accessToken.substring(0, 50) + '...\n');

    // Test 3: Validate token
    console.log('3️⃣ Testing Token Validation...');
    const tokenValidationResponse = await axios.post(`${BASE_URL}/auth/validate-token`, {
      token: loginResponse.data.data.accessToken
    });
    console.log('✅ Token Validation Success:', tokenValidationResponse.data);
    console.log('User Info:', tokenValidationResponse.data.data.user);
    console.log('');

    // Test 4: Refresh token
    console.log('4️⃣ Testing Refresh Token...');
    const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refreshToken: loginResponse.data.data.refreshToken
    });
    console.log('✅ Refresh Token Success:', refreshResponse.data);
    console.log('New Access Token:', refreshResponse.data.data.accessToken.substring(0, 50) + '...\n');

    // Test 5: Forgot password
    console.log('5️⃣ Testing Forgot Password...');
    const forgotPasswordResponse = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      email: testUser.email
    });
    console.log('✅ Forgot Password Success:', forgotPasswordResponse.data);
    console.log('');

    // Test 6: Reset password (with mock token)
    console.log('6️⃣ Testing Reset Password...');
    const resetPasswordResponse = await axios.post(`${BASE_URL}/auth/reset-password`, {
      token: 'a'.repeat(64), // Mock token for demo
      newPassword: 'newpassword123'
    });
    console.log('✅ Reset Password Success:', resetPasswordResponse.data);
    console.log('');

    console.log('🎉 All Authentication Tests Passed!');

  } catch (error) {
    console.error('❌ Test Failed:', error.response?.data || error.message);
  }
}

// Test error cases
async function testErrorCases() {
  console.log('\n🧪 Testing Error Cases...\n');

  try {
    // Test 1: Register with existing email
    console.log('1️⃣ Testing Register with Existing Email...');
    try {
      await axios.post(`${BASE_URL}/auth/register`, testUser);
    } catch (error) {
      console.log('✅ Expected Error:', error.response.data.message);
    }
    console.log('');

    // Test 2: Login with wrong password
    console.log('2️⃣ Testing Login with Wrong Password...');
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: testUser.email,
        password: 'wrongpassword'
      });
    } catch (error) {
      console.log('✅ Expected Error:', error.response.data.message);
    }
    console.log('');

    // Test 3: Validate invalid token
    console.log('3️⃣ Testing Invalid Token Validation...');
    const invalidTokenResponse = await axios.post(`${BASE_URL}/auth/validate-token`, {
      token: 'invalid-token'
    });
    console.log('✅ Invalid Token Response:', invalidTokenResponse.data);
    console.log('');

    console.log('🎉 All Error Case Tests Passed!');

  } catch (error) {
    console.error('❌ Error Test Failed:', error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting Authentication API Tests...\n');
  console.log('Make sure User Service is running on port 3002\n');
  
  await testAuthEndpoints();
  await testErrorCases();
  
  console.log('\n✨ All tests completed!');
}

runTests();
