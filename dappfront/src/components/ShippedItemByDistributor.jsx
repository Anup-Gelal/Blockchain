import React, { useState } from 'react';

const ShippedItemByDistributor = ({ contract }) => {
  const [productCode, setProductCode] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode) {
        setError('Product code is required');
        return;
      }

      const tx = await contract.shippedItemByDistributor(productCode);
      await tx.wait();

      console.log(`Item with product code ${productCode} shipped by distributor`);
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
        <button type="submit">Ship item</button>
      </form>
    </div>
  );
};

export default ShippedItemByDistributor;
