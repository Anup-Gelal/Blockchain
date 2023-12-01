import React, { useState,useEffect } from 'react'

const CreateDistributor = ({contract}) => {
    const [distributorAddress,setDistributorAddress]=useState("");
    const [distributorName,setDistributorName]=useState("");
    const [addDistributor,setAddDistributor]=useState(false);
    const [checkDistributorAddress,setCheckDistributorAddress]=useState("");
    const [distributorToRegister,setDistributorToRegister]=useState("");
    const [checkdistributorAddtoRegister,setCheckDistributorAddtoRegister]=useState("");
    const [disaddresscheck,setDisAddressCheck]=useState("");
    const [disNameGet,setDisNameGet]=useState("");
    const [accountToCheck, setAccountToCheck]=useState("");
    const [isDistributor,setIsDistributor]=useState(false);


    const addDistributorName=async()=>{
        try{
            if(!distributorAddress || !distributorName){
                console.log("Enter the distributor name and address");
                return;
            }
            const distributors=await contract.getDistributors(distributorAddress);
            if(Array.isArray(distributors) && distributors.includes(distributorName)){
                console.error(`Distributor with name ${distributorName} already exists`);
                return;
            }

            const tx=await contract.addDistributor(distributorAddress,distributorName);
            await tx.wait();
            setAddDistributor(true);
            setDistributorAddress("");
            setDistributorName(" ");
            console.log("Distributor added Successfully");

            return;
        } catch(error){
            console.error("Distributor was not added:",error);
        }
    }

    const getDistributors=async()=>{
        try{
            if(!checkDistributorAddress){
                Console.error("Enter the distributor address to check ");
                return;
            }
            const distributor=await contract.getDistributors(checkDistributorAddress);
            setCheckDistributorAddress(" ");
            console.log("Displayed successFully");
            console.log(distributor);
        }catch (error){
            console.error("Error in displaying:", error);
        }
    }

    const registerDistributorName=async()=>{
        try{
            if(!distributorToRegister || !checkdistributorAddtoRegister){
                console.error("Enter the name and address of the distributor to register");
                return;

            }
            const distributors=await contract.getDistributors(checkdistributorAddtoRegister);
            setCheckDistributorAddtoRegister('');
           if( Array.isArray(distributors) && distributors.includes(distributorToRegister)){
                



            const register=await contract.registerDistributorName(distributorToRegister);
            await register.wait();
            console.log(`Distributor:${distributorToRegister}`);
            await contract.setDistributorName(distributorToRegister);
            console.log(`Distriubutor is set:${distributorToRegister}`);}
            else{
                console.error(`Distributor ${distributorToRegister} not found in the list.`);
            }
            setDistributorToRegister('');


        } catch(error){
            console.log("error:",error);
        }


    }

    const getDistributorName=async(addressToCheck)=>{
        try{if(!addressToCheck){
            console.error("Enter the address");
            return;
        }
            const name=await contract.getDistributorName(addressToCheck);
            setDisNameGet(name);
            console.log(`Distributor for address ${addressToCheck}: ${name}`);

        } catch(error){
            console.log("error:",error)
        }
    }

    const checkIfDistributor=async(addressToCheck)=>{
        try{
            const distributors=await contract.getDistributors(addressToCheck);
            if(distributors.length>0){
                setIsDistributor(true);
                console.log(distributors);
            } else{
                setIsDistributor(false);
            }

        } catch (error) {
            console.error("error",error);
        }
    }

    const handleCheck=()=>{
        if(!accountToCheck){
            console.log("Enter the account to check");
            return;
        }
        checkIfDistributor(accountToCheck);
    }


    const checkIsDistributorNameRegistered = async () => {
        try {
          if (!distributorAddress || !distributorName) {
            console.error("Enter the distributor name and address");
            return;
          }
          const isRegistered = await contract.isDistributorNameRegistered(distributorAddress, distributorName);
      
          if (isRegistered) {
            console.log(`Distributor name ${distributorName} is registered`);
          } else {
            console.log(`Distributor name ${distributorName} is not registered`);
          }
        } catch (error) {
          console.error('Error checking:', error);
        }
      };

      


    useEffect(()=>{

    },[contract,distributorAddress,distributorName,distributorToRegister,disaddresscheck,checkDistributorAddress]);



  return (
    <div>
        <h2>Add Distributor</h2>
        <input value={distributorAddress}
        onChange={(e)=>setDistributorAddress(e.target.value)}
        placeholder='Enter the distributor address'
         />
         <input value={distributorName}
        onChange={(e)=>setDistributorName(e.target.value)}
        placeholder='Enter the distributor Name'
         />
         <button onClick={addDistributorName}>Add Distributor</button>


         <h2>Get Distributor</h2>
         <input value={checkDistributorAddress}
         onChange={(e)=>setCheckDistributorAddress(e.target.value)} 
         placeholder='Enter the address to get its distributor'/>
         <button onClick={getDistributors}>Get Distributors</button>

         <h2>Register Distributor</h2>
         <input value={checkdistributorAddtoRegister} 
            onChange={(e)=> setCheckDistributorAddtoRegister(e.target.value)}
            placeholder='Enter the address'/>
         <input value={distributorToRegister} 
         onChange={(e)=> setDistributorToRegister(e.target.value)}
         placeholder='distributor to register'/>
         <button onClick={registerDistributorName}>Register Distributor</button>

         <h2>Get Distributor Name</h2>
         <input value={disaddresscheck}
         onChange={(e)=>setDisAddressCheck(e.target.value)}
         placeholder='distributor address' />
         <button onClick={()=>getDistributorName(disaddresscheck)}>Enter the distributor address</button>


         <h2>Check if address is distributor</h2>
         <input value={accountToCheck}
         onChange={(e)=>setAccountToCheck(e.target.value)} 
         placeholder='account to check'/>
         <button onClick={handleCheck}>Check Distributor</button>
         {isDistributor ?(<p>The provided address is a Distributor</p>
         ):(
         <p>The provided address is not Distributor</p>)}

<h2>Check if distributor is registered or not</h2>

<input
    value={distributorAddress}
    onChange={(e) => setDistributorAddress(e.target.value)}
    placeholder="Enter distributor address"
/>

<input
    value={distributorName}
    onChange={(e) => setDistributorName(e.target.value)}
    placeholder='Distributor Name'
/>
<button onClick={checkIsDistributorNameRegistered}> Check registered distributor</button>


         
      
    </div>
  )
}

export default CreateDistributor
