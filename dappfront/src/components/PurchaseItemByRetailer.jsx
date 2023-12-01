import React, { useState } from 'react';

const PurchaseItemByRetailer = ({ contract }) => {
  const [productCode, setProductCode] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode || !price || !quantity) {
        setError('Product code, price, and quantity are required');
        return;
      }

      const tx = await contract.purchaseItemByRetailer(
        productCode,
        parseInt(quantity), // Convert quantity to a number
        parseInt(price) // Convert price to a number
      );
      await tx.wait();

      console.log(`Item with product code ${productCode} purchased by retailer`);
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
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Product Price"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <button type="submit">Purchase item</button>
      </form>
    </div>
  );
};

export default PurchaseItemByRetailer;
