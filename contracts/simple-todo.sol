// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
struct User{
    uint userId;
    address userAdd;
    string name;
    bool isAdded;
}
struct Task{
    uint taskId;
    string taskDetails;
    bool exists;
    bool isComplete;
}

contract Todo_list{
    mapping(uint => Task[])internal taskByUserId;
    mapping(address => bool)public addedUsers;
    User[]public users;

    address public admin;

    constructor(){
        admin = msg.sender;
    }
    modifier onlyAdmin(){
        require(admin == msg.sender,"You're not the admin!");
        _;
    }
    modifier onlyUsers(uint _userId){
        require(users[_userId].isAdded,"User could not be found!");
        _;
    }
    event UserAdded(address indexed userAdd,string indexed name);
    event TaskAdded(uint indexed userId,string taskDetails);
    event TaskRemoved(uint indexed userId,uint indexed taskId);


    function addUser(address _userAdd,string calldata _name)public onlyAdmin{
         require(!addedUsers[_userAdd],"User already added");
         uint userId = users.length;
         addedUsers[_userAdd] = true;
         User memory user = User(userId,_userAdd,_name,true);
         users.push(user);
         emit UserAdded(_userAdd,_name);
    }

    function addTask(uint _userId,string calldata _taskDetails)public onlyUsers(_userId){
        uint taskId = taskByUserId[_userId].length;
        Task memory task = Task(taskId,_taskDetails,true,false);
        taskByUserId[_userId].push(task);
        emit TaskAdded(_userId,_taskDetails);

    }
    function getTask(uint _userId,uint _taskId)public onlyUsers(_userId) view returns(Task memory){
         return taskByUserId[_userId][_taskId];
    }
    function markAsCompleted(uint _userId,uint _taskId)public onlyUsers(_userId){
        require(_taskId < taskByUserId[_userId].length,"Error!");
        require(taskByUserId[_userId][_taskId].exists,"No task found!");
        taskByUserId[_userId][_taskId].isComplete = true;
    }
    function removeTask(uint _userId,uint _taskId)public onlyUsers(_userId){
          require(_taskId < taskByUserId[_userId].length,"Error!");
        require(taskByUserId[_userId][_taskId].exists,"No task found!");
        taskByUserId[_userId][_taskId] = Task(0,"",false,false);
        emit TaskRemoved(_userId,_taskId);
    }

    }

