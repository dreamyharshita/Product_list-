import React from "react";

const ShowItem=(props)=>{
    return (
        <div>
        <h1>Products</h1>
        
       
        <div>{
        props.ProductData.map((prod,index)=>{
          return  <li key={index}> Product - {prod.product} Price-{prod.price} :  <button onClick={()=> {props.delete(prod.orderId)}}>Delete Product</button></li>
        })
        }</div>
        
        <h3>Total worth of products: Rs{props.sum}</h3>
        </div>
    );
     
}

export default ShowItem;