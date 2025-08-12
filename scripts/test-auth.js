const axios = require('axios');
const FormData = require('form-data');

// Base URL for the API
const BASE_URL = 'http://localhost:3000/api/auth';

// Test user data
const testUser = {
  name: 'Test User',
  email: `test${Date.now()}@example.com`,
  password: 'Test@1234',
};

// Helper function to make API calls
async function makeRequest(method, endpoint, data = null, headers = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    withCredentials: true, // Important for cookies
  };

  if (data) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return { data: response.data, status: response.status, headers: response.headers };
  } catch (error) {
    return {
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}

// Test the authentication flow
async function testAuthFlow() {
  console.log('Starting authentication flow test...\n');

  // 1. Test signup
  console.log('1. Testing signup...');
  const signupResponse = await makeRequest('post', '/signup', testUser);
  
  if (signupResponse.error) {
    console.error('❌ Signup failed:', signupResponse.error);
    return;
  }
  
  console.log('✅ Signup successful:', signupResponse.data);
  console.log('   Status:', signupResponse.status);
  console.log('   User ID:', signupResponse.data.user.id);
  
  // 2. Test login with correct credentials
  console.log('\n2. Testing login with correct credentials...');
  const loginResponse = await makeRequest('post', '/login', {
    email: testUser.email,
    password: testUser.password,
  });
  
  if (loginResponse.error) {
    console.error('❌ Login failed:', loginResponse.error);
    return;
  }
  
  console.log('✅ Login successful:', loginResponse.data);
  console.log('   Status:', loginResponse.status);
  
  // Get the auth token from cookies for subsequent requests
  const cookies = loginResponse.headers['set-cookie'];
  const authCookie = cookies?.find(cookie => cookie.startsWith('auth-token='));
  
  if (!authCookie) {
    console.error('❌ No auth token cookie found in login response');
    return;
  }
  
  console.log('   Auth cookie found');
  
  // 3. Test getting current user
  console.log('\n3. Testing get current user...');
  const meResponse = await makeRequest('get', '/me', null, {
    Cookie: authCookie,
  });
  
  if (meResponse.error) {
    console.error('❌ Get current user failed:', meResponse.error);
    return;
  }
  
  console.log('✅ Get current user successful:', meResponse.data);
  
  // 4. Test logout
  console.log('\n4. Testing logout...');
  const logoutResponse = await makeRequest('post', '/logout', null, {
    Cookie: authCookie,
  });
  
  if (logoutResponse.error) {
    console.error('❌ Logout failed:', logoutResponse.error);
    return;
  }
  
  console.log('✅ Logout successful');
  console.log('   Status:', logoutResponse.status);
  
  // 5. Verify session is invalid after logout
  console.log('\n5. Verifying session is invalid after logout...');
  const meAfterLogout = await makeRequest('get', '/me', null, {
    Cookie: authCookie,
  });
  
  if (meAfterLogout.status === 401) {
    console.log('✅ Session is invalid after logout (as expected)');
  } else {
    console.error('❌ Session is still valid after logout');
  }
  
  console.log('\n🎉 Authentication flow test completed successfully!');
}

// Run the test
testAuthFlow().catch(console.error);
