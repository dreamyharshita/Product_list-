import React,{useState,useEffect} from "react";
import ShowItem from "./ShowItem";



 function App() {

  const [orderId,setOrderId]=useState('');
  const [price,setPrice]=useState('');
  
  const [product,setProduct]=useState('');
  const[sum,setSum]=useState(0);
  
  const [ProductData,setData]=useState([]);

  
  useEffect(()=>{
   
    const localStorageObj = localStorage;
    const localStorageKeys = Object.keys(localStorageObj);
    const loadedItem = [];
    let sum_temp=0;
    for (let i in localStorageKeys) {
      const key = localStorageKeys[i];
      const itemDetailsString = localStorageObj[key];
    
      const updatedItemDetails = JSON.parse(itemDetailsString);
      console.log(updatedItemDetails.price);
      sum_temp=sum_temp+parseInt(updatedItemDetails.price);
      loadedItem.push(updatedItemDetails);
    }
  console.log("loaded item",loadedItem)

    setData(loadedItem);
    setSum(sum_temp);
  },[]);
 
  


  const OrderIdHandler=(e)=>{
    setOrderId(e.target.value);
  }
  const PriceHandler=(e)=>{
    setPrice(e.target.value);
  }
  const ProductHandler=(e)=>{
    setProduct(e.target.value);
  }
 
  
  


  const ManageData=(e)=>{
    e.preventDefault();
    const obj={
      orderId: orderId,
      price: price,
      product: product,
     };

      setData([...ProductData,obj]);
      setSum(parseInt(sum)+parseInt(price));

    localStorage.setItem(orderId,JSON.stringify(obj));
  
    
    setOrderId('');
    setProduct('');
    setPrice('');
    

    
  }

  const deleteData=(orderId)=>{
    const updatedData = ProductData.filter((item) => item.orderId !== orderId);
    setData(updatedData);
    localStorage.removeItem(orderId);
  }
  
  return   (
  <>

   <form>
    <label>Product Order Id</label>
    <input type="number" id="order-id" onChange={OrderIdHandler} value={orderId}></input>
    <label>Selling Price</label>
    <input type="number" id="price" onChange={PriceHandler} value={price}></input>
    <label>Product Name</label>
    <input type="text" id="product" onChange={ProductHandler} value={product}></input>
    
    
    <button onClick={ManageData}>Add Product</button>
    

   </form>
   
     <ShowItem  ProductData={ProductData} delete={deleteData} sum={sum}/> 
    </>
  );
}

export default App;
