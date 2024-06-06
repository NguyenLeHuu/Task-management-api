const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const taskService = require('../src/services/taskServices');
const Task = require('../src/models/task');

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
  await Task.deleteMany({});
});

describe('Task Service', () => {
  test('should create a task', async () => {
    const title = 'Test Task';
    const description = 'Test Description';
    const status = 'incomplete';

    const task = await taskService.createTask(title, description, status);

    expect(task).toHaveProperty('_id');
    expect(task.title).toBe(title);
    expect(task.description).toBe(description);
    expect(task.status).toBe(status);
  });

  test('should get all tasks', async () => {
    const title = 'Test Task';
    const description = 'Test Description';
    const status = 'incomplete';
    await taskService.createTask(title, description, status);

    const tasks = await taskService.getAllTasks();

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe(title);
  });

  test('should get a task by ID', async () => {
    const title = 'Test Task';
    const description = 'Test Description';
    const status = 'incomplete';
    const newTask = await taskService.createTask(title, description, status);

    const task = await taskService.getTaskById(newTask._id);

    expect(task).toHaveProperty('_id');
    expect(task.title).toBe(title);
  });

  test('should update task status', async () => {
    const title = 'Test Task';
    const description = 'Test Description';
    const status = 'incomplete';
    const newTask = await taskService.createTask(title, description, status);
  
    const updatedStatus = 'completed';
    const updatedTask = await taskService.updateTask(newTask._id,  updatedStatus );
  
    expect(updatedTask).toHaveProperty('_id');
    expect(updatedTask.status).toBe(updatedStatus);
  });
  

  test('should delete a task', async () => {
    const title = 'Test Task';
    const description = 'Test Description';
    const status = 'incomplete';
    const newTask = await taskService.createTask(title, description, status);

    const deletedTask = await taskService.deleteTask(newTask._id);

    expect(deletedTask).toHaveProperty('_id');
    expect(deletedTask.title).toBe(title);

    const tasks = await taskService.getAllTasks();
    expect(tasks.length).toBe(0);
  });
});
