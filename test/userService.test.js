const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userService = require('../src/services/userService');
const User = require('../src/models/user');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('User Service', () => {
  test('should create a user', async () => {
    const username = 'testuser';
    const password = 'testpassword';

    const user = await userService.createUser(username, password);

    expect(user).toHaveProperty('_id');
    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
  });

  test('should get all users', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    await userService.createUser(username, password);

    const users = await userService.getAllUsers();

    expect(users.length).toBe(1);
    expect(users[0].username).toBe(username);
  });

  test('should get a user by ID', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const newUser = await userService.createUser(username, password);

    const user = await userService.getUserById(newUser._id);

    expect(user).toHaveProperty('_id');
    expect(user.username).toBe(username);
  });

  test('should update a user', async () => {
    const username = 'testUser';
    const password = 'password123';
    const newUser = await userService.createUser(username, password);
  
    const updatedUsername = 'updatedUser';
    const updatedPassword = 'updatedPassword123';
    const updatedUser = await userService.updateUser(newUser._id, updatedUsername, updatedPassword);
  
    expect(updatedUser).toHaveProperty('_id');
    expect(updatedUser.username).toBe(updatedUsername);
  });

  test('should delete a user', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const newUser = await userService.createUser(username, password);

    const deletedUser = await userService.deleteUser(newUser._id);

    expect(deletedUser).toHaveProperty('_id');
    expect(deletedUser.username).toBe(username);

    const users = await userService.getAllUsers();
    expect(users.length).toBe(0);
  });
});
