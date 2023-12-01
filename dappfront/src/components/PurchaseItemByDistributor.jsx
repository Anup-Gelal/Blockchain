import React, { useState } from 'react';

const PurchaseItemByDistributor = ({ contract, distributorAddress, distributorName }) => {
  const [productCode, setProductCode] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode || !price || !quantity) {
        setError('Product code, price, and quantity are required');
        return;
      }

      const tx = await contract.purchaseItemByDistributor(productCode, price, quantity
         // Assuming you have the distributor's Ethereum address
      );
      await tx.wait();

      console.log(`Item with product code ${productCode} purchased by distributor`);
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
        <input
          
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <button type="submit">Purchase item</button>
      </form>
    </div>
  );
};

export default PurchaseItemByDistributor;
