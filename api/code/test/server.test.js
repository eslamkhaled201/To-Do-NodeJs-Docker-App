const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const { once } = require('node:events');
const app = require('../server');

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await once(server, 'listening');
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server.closeAllConnections();
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test('GET /api/health reports that the API is healthy', async () => {
  const response = await fetch(`${baseUrl}/api/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('POST /api/auth/register rejects requests with missing fields', async () => {
  const response = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'person@example.com' }),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'All fields are required' });
});

test('POST /api/auth/login rejects requests with missing credentials', async () => {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'person@example.com' }),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'Email and password are required' });
});

test('GET /api/todos requires authentication', async () => {
  const response = await fetch(`${baseUrl}/api/todos`);

  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: 'No token provided' });
});
