import React, { useState } from 'react';

const FetchProductStatus = ({ contract }) => {
  const [productCode, setProductCode] = useState('');
  const [error, setError] = useState(null);
  const [productStatus, setProductStatus] = useState(null);

  const handleFetchProductStatus = async () => {
    try {
      if (!productCode) {
        setError('Product code is required');
        return;
      }

      const result = await contract.fetchProductStatus(productCode);

      // Update product status state
      setProductStatus({
        forSaleByManufacturerQuantity: result[0],
        purchasedByDistributorQuantity: result[1],
        receivedByDistributorQuantity: result[2],
        forSaleByDistributorQuantity: result[3],
        purchasedByRetailerQuantity: result[4],
        receivedByRetailerQuantity: result[5],
        forSaleByRetailerQuantity: result[6],
      });
    } catch (error) {
      setError(error.message || 'An error occurred while fetching product status.');
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <input
        type="text"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        placeholder="Product Code"
      />
      <button onClick={handleFetchProductStatus}>Fetch Product Status</button>

      {productStatus && (
        <div>
          <p>For Sale By Manufacturer Quantity: {productStatus.forSaleByManufacturerQuantity}</p>
          <p>Purchased By Distributor Quantity: {productStatus.purchasedByDistributorQuantity}</p>
          <p>Received By Distributor Quantity: {productStatus.receivedByDistributorQuantity}</p>
          <p>For Sale By Distributor Quantity: {productStatus.forSaleByDistributorQuantity}</p>
          <p>Purchased By Retailer Quantity: {productStatus.purchasedByRetailerQuantity}</p>
          <p>Received By Retailer Quantity: {productStatus.receivedByRetailerQuantity}</p>
          <p>For Sale By Retailer Quantity: {productStatus.forSaleByRetailerQuantity}</p>
        </div>
      )}
    </div>
  );
};

export default FetchProductStatus;
