import React, { useState } from 'react';

const ReceivedItemByRetailer = ({ contract }) => {
  const [productCode, setProductCode] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode) {
        setError('Product code is required');
        return;
      }

      const tx = await contract.receivedItemByRetailer(productCode);
      await tx.wait();

      console.log(`Item with product code ${productCode} received by retailer`);
    } catch (error) {
      setError(error.message || 'An error occurred while processing the transaction.');
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          placeholder="Product Code"
        />
        <button type="submit">Receive item</button>
      </form>
    </div>
  );
};

export default ReceivedItemByRetailer;
