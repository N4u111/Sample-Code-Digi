const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting User Service Integration...\n');

// Function to start a service
function startService(name, command, cwd) {
  console.log(`📦 Starting ${name}...`);
  
  const child = spawn(command, [], {
    cwd: cwd,
    shell: true,
    stdio: 'inherit'
  });

  child.on('error', (error) => {
    console.error(`❌ Error starting ${name}:`, error.message);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.log(`⚠️ ${name} exited with code ${code}`);
    }
  });

  return child;
}

// Start services
const userService = startService('User Service', 'npm run start:dev', path.join(__dirname, 'user-service'));
const apiGateway = startService('API Gateway', 'npm run start:dev', path.join(__dirname, 'api-gateway'));

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down services...');
  userService.kill('SIGINT');
  apiGateway.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down services...');
  userService.kill('SIGTERM');
  apiGateway.kill('SIGTERM');
  process.exit(0);
});

console.log('\n✅ Services started!');
console.log('📡 API Gateway: http://localhost:3000');
console.log('👤 User Service: http://localhost:3002');
console.log('🐰 RabbitMQ: http://localhost:15672');
console.log('\nPress Ctrl+C to stop all services');
