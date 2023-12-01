import React, {useState,useEffect} from 'react'

const ProduceItemByManufacturer = ({contract}) => {

  const [stockUnit, setStockUnit] = useState(0);
  const [productCode, setProductCode] = useState(0);
  const [manufacturerName, setManufacturerName] = useState('');
  const [manufacturerInformation, setManufacturerInformation] = useState('');
  const [productNotes, setProductNotes] = useState('');
  const [price, setPrice] = useState(0);
  const [itemadded,setItemAdded]=useState('false');
  const [error,setError]=useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (!stockUnit || !productCode || !manufacturerName || !manufacturerInformation || !productNotes || !price) {
        setError('All fields are required');
        return;
      }
  
      const tx = await contract.produceItemByManufacturer(
        stockUnit,
        productCode,
        manufacturerName,
        manufacturerInformation,
        productNotes,
        price
      );
  
      await tx.wait();
      setItemAdded(true);

      console.log(`Product added successfully with productCode: ${productCode}`);
      console.log(`stockunit:${stockUnit}`);
      console.log(`manufacturerName:${manufacturerName}`);
      console.log(`manufacturerInformation:${manufacturerInformation}`);
      console.log(`productNotes:${productNotes}`);
      console.log(`price:${price}`);
  


    } catch (error) {
      setError(error.message || 'An error occurred while processing the transaction.');
    }
  };
  
  
  


  
  




  useEffect(()=>{

  },[productCode,manufacturerName,manufacturerInformation,productNotes,price]);

  return (
    <>
    <div>
    {error && <p>Error: {error}</p>}
        <form onSubmit={handleSubmit}>
        
            <input
            value={manufacturerName}
            onChange={(e)=>setManufacturerName(e.target.value)}
            placeholder='Manufacturer Name' />


            <input 
            value={stockUnit}
            onChange={(e)=>setStockUnit(e.target.value)}
            placeholder='Stock Unit' />

            <input 
            value={productCode}
            onChange={(e)=>setProductCode(e.target.value)}
            placeholder='Product Code' />

            
           <input 
            value={manufacturerInformation}
            onChange={(e)=>setManufacturerInformation(e.target.value)}
            placeholder='Manufacturer Information' />

            <input 
            value={productNotes}
            onChange={(e)=>setProductNotes(e.target.value)}
            placeholder='Product Notes' />

            <input 
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            placeholder='Product Price' />


            <button type="submit">Produce item</button>

           


        </form>
    </div>
    
    
    
    </>
  )
}

export default ProduceItemByManufacturer
