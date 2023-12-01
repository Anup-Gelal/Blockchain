import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import {QrReader} from 'react-qr-reader';



const FetchItem = ({ contract }) => {
  const [productCode, setProductCode] = useState('');
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [qrscannedData, setQrScannedData]=useState(null);

  const handleFetchItem = async () => {
    try {
      if (!productCode) {
        setError('Product code is required');
        return;
      }

      const result = await contract.fetchItemtwo(productCode);
      const timestamp=parseInt(result[5]);
      const date=new Date(timestamp*1000);
      const formattedDate=date.toDateString();

      const modifiedResult = {
       // itemstockUnit: result[0].toString(),
        itemproductcode: result[1].toString(),
        productNotes:result[3].toString(),
        productPrice:result[4].toString(),
        productDate:formattedDate,
        distributorID:result[7].toString(),
        retailerID:result[8].toString(),
       // consumerID:result[9].toString(),
        manufacturerName:result[10].toString(),
        manufacturerInformation:result[11].toString()
      };
  
      setItemData(modifiedResult);
   
    } catch (error) {
      setError(error.message || 'An error occurred while fetching item data.');
    }
  };

  const handelScanQRCode=(data)=>{
    if(data){
      setQrScannedData(JSON.parse(data));
    }
  };
  const handleError=(err)=>{
    console.error(err);
  };

  const renderScannedData = () => {
    if (qrscannedData) {
      return (
        <div>
          <h2>Scanned Data</h2>
          <p>
            {Object.entries(qrscannedData)
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ')}
          </p>
          
        </div>
      );
    }
    return null;
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
      <button onClick={handleFetchItem}>Fetch Item</button>
{/*
      {itemData && (
        <div>
          <p>Stock Unit: {itemData.itemstockUnit}</p>
          <p>Product Code: {itemData.itemproductcode}</p>
          <p>productNotes: {itemData.productNotes}</p>
          <p>productPrice: {itemData.productPrice}</p>
          <p>productDate: {itemData.productDate}</p>
          <p>distributorID: {itemData.distributorID}</p>
          <p>retailerID: {itemData.retailerID}</p>
          <p>consumerID: {itemData.consumerID}</p>
          <p>manufacturerName: {itemData.manufacturerName}</p>
          <p>Manufacturer Information: {itemData.manufacturerInformation}</p>
        </div>
      )}*/}
      
      {/* QR Scanner */}
      <QrReader
      delay={300}
      onError={handleError}
      onScan={handelScanQRCode}
      style={{width:'100%', maxWidth:'300px'}}/>



      {qrscannedData && (
        <div>
          <h2>Scanned Data</h2>
          <pre>{JSON.stringify(qrscannedData, null, 2)}</pre>
        </div>
      )}
      
      {/* Display scanned QR data */}
      {renderScannedData()}


      {/* QR Code for the itemData */}
      {itemData && 
      (
        <div>
          <h2>QR code</h2>
      <QRCode value={JSON.stringify(itemData)}
       size={256} 
       level='H' 
       includeMargin={true} />
       </div>)} {/* Adjust the size as needed */}
      
     
     

      
    </div>
  );
};

export default FetchItem;

