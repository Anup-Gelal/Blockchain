import React, { useState } from 'react';

const SellItemByDistributor = ({ contract }) => {
  const [productCode, setProductCode] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode || !price) {
        setError('Product code and price are required');
        return;
      }

      
      
      // Call the smart contract function to sell the item
      const tx = await contract.sellItemByDistributor(productCode, price);
      await tx.wait();

      console.log(`Item with product code ${productCodeNumber} put up for sale by distributor for price ${priceNumber}`);
      
      // Clear input fields after successful transaction
      setProductCode('');
      setPrice('');
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message || 'An error occurred while processing the transaction.');
    }
  };

  return (
    <div>
     
      <form onSubmit={handleSubmit}>
        <input
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          placeholder="Product Code"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <button type="submit">Put up for sale</button>
      </form>
    </div>
  );
};

export default SellItemByDistributor;
