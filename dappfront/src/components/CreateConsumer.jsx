import React, { useState,useEffect } from 'react';



const CreateConsumer = ({contract}) => {
    const [consumerAddress, setConsumerAddress] = useState('');
    const [name, setName] = useState('');
    const [livingAddress, setLivingAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [registered, setRegistered] = useState(false);
    const [consumerInfo, setConsumerInfo] = useState(null);
    const [allConsumers, setAllConsumers] = useState([]);
    // Add a consumer to the contract
    const addConsumer = async () => {
        try {
            // Call the contract function to add a consumer
            await contract.addConsumer(consumerAddress, name, livingAddress, postalCode);
            setRegistered(true);
            setConsumerAddress('');
            setName('');
            setLivingAddress('');
            setPostalCode('');
            console.log('Consumer added successfully');
        } catch (error) {
            console.error('Error adding consumer:', error);
        }
    };

    // Remove a consumer from the contract
    const removeConsumer = async () => {
        try {
            // Call the contract function to remove a consumer
            await consumer.removeConsumer(consumerAddress);
            setRegistered(false);
            console.log('Consumer removed successfully');
        } catch (error) {
            console.error('Error removing consumer:', error);
        }
    };

    // Get consumer information by address from the contract
   // Get consumer information by address from the contract
const getConsumerInfo = async () => {
    try {
        // Call the contract function to get consumer info
        const info = await contract.getConsumer(consumerAddress);

        // Convert BigNumber objects to strings
        const formattedInfo = info.map((item) => {
            if (item._isBigNumber) {
                return item.toString();
            }
            return item;
        });

        setConsumerInfo(formattedInfo);
        console.log('Consumer info retrieved successfully:', formattedInfo);
    } catch (error) {
        console.error('Error getting consumer info:', error);
    }
};

const getAllConsumers = async () => {
    try {
        const addresses = await contract.getAllConsumers();
        setAllConsumers(addresses);
        console.log('All consumer addresses retrieved successfully:', addresses);
    } catch (error) {
        console.error('Error getting all consumer addresses:', error);
    }
};




    useEffect(() => {
        // Any side effects based on dependencies go here if needed
    }, [contract, consumerAddress, name,livingAddress,postalCode,consumerInfo]);


    return (
        <div>
            <h2>Add Consumer</h2>
            <input
                value={consumerAddress}
                onChange={(e) => setConsumerAddress(e.target.value)}
                placeholder="Enter consumer address"
            />
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the name"
            />
            <input
                value={livingAddress}
                onChange={(e) => setLivingAddress(e.target.value)}
                placeholder="Enter the living address"
            />
            <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter postal code"
            />
            <button onClick={addConsumer}>Add Consumer</button>

            <h2>Remove Consumer</h2>
            <button onClick={removeConsumer}>Remove Consumer</button>

            <h2>Get Consumer Info</h2>
            <input
                value={consumerAddress}
                onChange={(e) => setConsumerAddress(e.target.value)}
                placeholder="Enter consumer address"
            />
            <button onClick={getConsumerInfo}>Get Consumer Info</button>

            {consumerInfo && (
                <div>
                    <h3>Consumer Info</h3>
                    <p>Name: {consumerInfo[0]}</p>
                    <p>Living Address: {consumerInfo[1]}</p>
                    <p>Postal Code: {consumerInfo[2]}</p>
                </div>
            )}
            <h2>All Consumer Addresses</h2>
            <ul>
                {allConsumers.map((address, index) => (
                    <li key={index}>{address}</li>
                ))}
            </ul>

            <button onClick={getAllConsumers}>Get All Consumers</button>

           
        </div>
    );
};

export default CreateConsumer;
