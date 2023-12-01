import { useState,useEffect } from 'react'
import abi from "./assets/contractfile/supplychain111.json"
import './App.css'
import { ethers } from "ethers"
import Web3 from "web3"
import CreateManufacturer from './components/CreateManufacturer'
import CreateDistributor from './components/CreateDistributor'
import CreateRetailer from './components/CreateRetailer'
import CreateConsumer from './components/CreateConsumer'
import ProduceItemByManufacturer from './components/ProduceItemByManufacturer'
import SellItemByManufacturer from './components/SellItemByManufacturer'
import PurchaseItemByDistributor from './components/PurchaseItemByDistributor'
import ShippedItemByManufacturer from './components/ShippedItemByManufacturer'
import ReceivedItemByDistributor from './components/ReceivedItemByDistributor'
import SellItemByDistributor from './components/SellItemByDistributor'
import PurchaseItemByRetailer from './components/PurchaseItemByRetailer'
import ShippedItemByDistributor from './components/ShippedItemByDistributor'
import ReceivedItemByRetailer from './components/ReceivedItemByRetailer'
import SellItemByRetailer from './components/SellItemByRetailer'
import BuyItemByConsumer from './components/BuyItemByConsumer'
import FetchItem from './components/Fetchitem'
import FetchItemHistory from './components/FetchItemHistroy'

function App() {
  
  const [state, setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount]=useState("Not connected");
  const [contractInstance,setContractInstance]=useState(null);

  useEffect(()=>{
    const handleAccountsChanged= (accounts)=>{
      if (accounts.length>0){
        setAccount(accounts[0]);
      } else {
        setAccount("Not Connected");
      }
    }
    const template=async()=>{
      const contractAddress="0xAaE630e3a986f1932BE7079E8e897cA15f7e989D";
      const contractABI=abi.abi;

      const {ethereum}=window;

      try {
        
      

      const account=await ethereum.request({
        method:"eth_requestAccounts"
      });
     setAccount(account[0]);
     ethereum.on("accountsChanged", handleAccountsChanged);

      const provider=new ethers.providers.Web3Provider(ethereum); // reading the blockchain
      const signer= provider.getSigner(); // writing the blockchain

      const contract=new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      )
      console.log(contract)
      setState({provider,signer,contract});
      setContractInstance(contract);
      } catch(error){
        alert(error);
      }

    }
    template();
  },[])
{/*
  useEffect(() => {
    const connectToWallet = async () => {
      const { ethereum } = window;
  
      if (ethereum) {
        try {
          // Check if permission is already granted
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            // Proceed with other blockchain operations
            // ...
          } else {
            // Request account access
            await ethereum.request({ method: "eth_requestAccounts" });
            // Fetch and set account details
            const updatedAccounts = await ethereum.request({ method: "eth_accounts" });
            setAccount(updatedAccounts[0]);
            // Proceed with other blockchain operations
            // ...
          }
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        console.error("MetaMask not found");
      }
    };
  
    connectToWallet();
  }, []);
  
*/}
{/*
const [web3,setweb3]=useState(undefined);
const [account,setAccount]=useState("");
const [contract,setContract]=useState(undefined);

useEffect(()=>{
  const init=async()=>{
    try{
    const web3Instance=await loadWeb3();
    if(web3Instance){
      setweb3(web3Instance);
    await loadBlockchainData(web3Instance);}
  } catch(error){
    alert("Error initializing the app:", error);
  }};
  init();
},[]);


const loadWeb3=async()=>{
  if(window.ethereum) {
    try {
      const web3Instance=new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return web3Instance;
      
      
    } catch (error) {
      console.error("Error loading Web3:", error);
      return null;
    }
  }
  else {
    console.error("metamask not Found");
    return null;
  }
};

 {/*
const loadBlockchainData =async (web3Instance)=>{
 
  try {
    const accounts = await web3Instance.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3Instance.eth.net.getId();
    const deployedNetwork = abi.networks[networkId];
    const contractInstance= new web3.eth.Contract(
      abi.abi,
      deployedNetwork && deployedNetwork.address
    );
   // setContract(contractInstance);

  } catch(error) {
    console.error("Error loading bolckchain data", error);
    
  }
}

const loadBlockchainData = async (web3Instance) => {
  try {
    if (!web3Instance || !web3Instance.eth) {
      console.error('Web3 instance or eth object not available');
      return;
    }

    const accounts = await web3Instance.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3Instance.eth.net.getId();
    const deployedNetwork = abi.networks[networkId];

    if (deployedNetwork) {
      const contractInstance = new web3Instance.eth.Contract(
        abi.abi,
        deployedNetwork.address
      );
      setContract(contractInstance);
    } else {
      console.error('Deployed network not found');
    }
  } catch (error) {
    console.error('Error loading blockchain data', error);
  }
};



async function addRole(role, address){
  try {
    const hasRole =await contract[`is${role}`](address);
    if (!hasRole){
      await contract[`add${role}`](address);
    } 
  } catch (error) {
    console.error(`Error adding ${role} for ${address}:${error}`);
    throw error;
  }
}
*/}












  return (
    <>
    connected:{account}
  <CreateManufacturer contract={contractInstance}/>
   <CreateDistributor contract={contractInstance} />
   <CreateRetailer contract={contractInstance}/>
   <CreateConsumer contract={contractInstance}/>
   <ProduceItemByManufacturer contract={contractInstance}/>
   <SellItemByManufacturer contract={contractInstance}/>
    <PurchaseItemByDistributor contract={contractInstance}/>
    <ShippedItemByManufacturer contract={contractInstance}/>
    <ReceivedItemByDistributor contract={contractInstance}/>
    <SellItemByDistributor contract={contractInstance}/>
    <PurchaseItemByRetailer contract={contractInstance}/>
    <ShippedItemByDistributor contract={contractInstance}/>
    <ReceivedItemByRetailer contract={contractInstance}/>
    <SellItemByRetailer contract={contractInstance}/>
    <BuyItemByConsumer contract={contractInstance}/>
    <FetchItem contract={contractInstance}/>
    <FetchItemHistory contract={contractInstance}/>
    </>
  )
}

export default App
