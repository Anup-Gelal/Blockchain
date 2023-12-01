import React, { useState } from 'react';

const ReceivedItemByDistributor = ({ contract }) => {
  const [productCode, setProductCode] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode || !quantity) {
        setError('Product code and quantity are required');
        return;
      }

      const tx = await contract.receivedItemByDistributor(productCode, quantity);
      await tx.wait();

      console.log(`Item with product code ${productCode} received by distributor`);
    } catch (error) {
      setError(error.message || 'An error occurred while processing the transaction.');
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          placeholder="Product Code"
        />
        <input
          
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <button type="submit">Mark as received</button>
      </form>
    </div>
  );
};

export default ReceivedItemByDistributor;
