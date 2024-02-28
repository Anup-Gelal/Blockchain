const hre=require("hardhat");

const main = async () => {
  const Supplychain = await hre.ethers.getContractFactory("supplychain111");
  const supplychain = await Supplychain.deploy();

  await supplychain.waitForDeployment();


  console.log("Transactions address: ", supplychain.target);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

// 0x2AF85f07cE4a48d71E5ffeA18d1f72F0d80d5D78

// address used as second time deployment:  0xAaE630e3a986f1932BE7079E8e897cA15f7e989D

// address used for supplychain2 for deployment:  0x1513ec8fd137032a09d8957E5213736A1495Db9B
// address 2: 0x0bAdb1753d992bFE608D890972A0959d5E2b846B
// latest address: 0x9904BfF082d228689B2e49338F831C4F8A9E18E8