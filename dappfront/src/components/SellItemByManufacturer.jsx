import React, { useState } from 'react';

const SellItemByManufacturer = ({ contract }) => {
  const [productCode, setProductCode] = useState(0);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode || !price) {
        setError('Product code and price are required');
        return;
      }

      const tx = await contract.sellItemByManufacturer(productCode, price);
      await tx.wait();

      console.log(`Item with product code ${productCode} is now for sale by the manufacturer for price ${price}`);
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
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Product Price"
        />
        <button type="submit">Sell item</button>
      </form>
    </div>
  );
};

export default SellItemByManufacturer;
