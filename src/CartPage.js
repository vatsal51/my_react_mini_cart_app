import React from 'react'

function CartPage(item) {
    console.log(item.item.products);
    // console.log(item.item.products[0].title);

  return (
  <div>
   
 {
    item.length>0 && 
    item.item.products.map((ita)=>
             <span key={ita.id}>{ita.title}</span>
         )
 }
 
  </div>
  )
}

export default CartPage;
