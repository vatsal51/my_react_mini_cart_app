import React from "react";
import Cross from "./cross.svg"
function MiniCart({ setProducts, products, item, visible }) {

  const deleteProduct = (id) => {
    const UpdateProduct = products.map((prod) =>
      prod.id === id ? { ...prod, quantity: 0 } : prod
    );
    setProducts(UpdateProduct);
  };

 
  
  return (

    <div className={`${visible ? "miniCart open" : "miniCart"}`} >
      {/* conditional rendering products if there are items in cart else show empty cart message */}
      {item ? products.map((product) => {
        if (product.quantity > 0) {
          return (
            <div key={product.id} className="miniCart_products_wrapper">
              <div className="miniCart_products">
                <img src={Cross} className="svg-cross" alt="delete icon" onClick={() => deleteProduct(product.id)}></img>
                <span>{product.title}</span>
                <span style={{ fontWeight: "bold" }}>{product.currency} {product.price}</span>
                <span className="quantity">Qty:{product.quantity}</span>
              </div>
            </div>
          );
        }
      })
        : <div className="cart_empty">NO ITEMS IN CART</div>}
    </div>
  );
}

export default MiniCart;
