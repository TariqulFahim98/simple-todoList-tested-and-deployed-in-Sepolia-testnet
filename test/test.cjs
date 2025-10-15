const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("simple-todo contract testing", function() {
  let todo;
  let owner;
  let user1;

beforeEach(async function () {
  [owner, user1] = await ethers.getSigners();
  const Todo = await ethers.getContractFactory("Todo_list");
  todo = await Todo.deploy();
  await todo.waitForDeployment();
});

it("only admin can add users", async function () {
  await todo.addUser(user1.address, "fahim");
  const user = await todo.users(0);

  expect(user.userId).to.equal(0);
  expect(user.userAdd).to.equal(user1.address);
  expect(user.name).to.equal("fahim");
  expect(user.isAdded).to.equal(true);

  const isAdded = await todo.addedUsers(user1.address);
  expect(isAdded).to.equal(true);
});

it("should allow a registered user to add a task", async function () {
  await todo.addUser(user1.address, "fahim");
  await todo.connect(user1).addTask(0, "eat pizza!");

  const task = await todo.getTask(0, 0);

  expect(task.taskId).to.equal(0);
  expect(task.taskDetails).to.equal("eat pizza!");
  expect(task.exists).to.equal(true);
  expect(task.isComplete).to.equal(false);
});

it("should mark task as completed", async function () {
  await todo.addUser(user1.address, "fahim");
  await todo.connect(user1).addTask(0, "eat pizza!");

  await todo.connect(user1).markAsCompleted(0, 0);

  const task = await todo.getTask(0, 0);
  expect(task.isComplete).to.equal(true);
});

it("Once user is added,event to be emitted", async function(){
  await expect (todo.addUser(user1.address,"fahim"))
  .to.emit(todo,"UserAdded")
  .withArgs(user1.address,"fahim");
});

  // event TaskAdded(uint indexed userId,string taskDetails);
it("Once user adds task, event should be emitted", async function () {
   await todo.addUser(user1.address, "fahim");
  await expect(todo.connect(user1).addTask(0, "eat pizza!"))
    .to.emit(todo, "TaskAdded")
    .withArgs(0, "eat pizza!");
})

it("once user removes a task, event should be emitted", async function(){
 await todo.addUser(user1.address, "fahim");
  await todo.connect(user1).addTask(0, "eat pizza!");

  await expect(todo.connect(user1).removeTask(0, 0))
    .to.emit(todo, "TaskRemoved")
    .withArgs(0, 0);
})
})