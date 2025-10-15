const hre = require("hardhat");
async function main(){
    console.log("simple_todolist Deploying...");

    const Todo = await hre.ethers.getContractFactory("Todo_list");
    const todo = await Todo.deploy();
    await todo.waitForDeployment();
    const contractAddress = await  todo.getAddress();
    console.log(`✅ Todo_list deployed successfully at: ${contractAddress}`);
    
}
main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error("Error",error);
    process.exit(1);
});