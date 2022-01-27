import './App.css';
import React, { useEffect, useState } from 'react';
import CartPage from './CartPage';

function App() {
  const [items,setItems] = useState([]);

  useEffect(()=>{
    fetch("https://dnc0cmt2n557n.cloudfront.net/products.json")
    .then(response => response.json())
    .then((data)=>
     setItems(data)
     
    )
},[]);

  return (
    <div className="App box">
    
     <CartPage item={items} />
    </div>
  
  )
}

export default App;
