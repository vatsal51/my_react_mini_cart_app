import React from "react";
import Cross from "./remove-svgrepo-com.svg"
function MiniCart({ setProducts, products, item, cost }) {
  const deleteProduct = (id) => {
    const UpdateProduct = products.map((prod) =>
      prod.id === id ? { ...prod, quantity: 0 } : prod
    );
    setProducts(UpdateProduct);
  };

  return (
    <div className="miniCart">
      {item > 0
        ? products.map((product) => {
            if (product.quantity > 0) {
              return (
                 
                <div key={product.id} className="miniCart_products_wrapper">
                  <div className="miniCart_products">
                    <img src={Cross} className="svg-cross" alt="delete icon" onClick={() => deleteProduct(product.id)}></img>
                    <span>{product.title}</span>   
                  <span style={{fontWeight:"bold"}}>{product.currency} {product.price}</span>
                  <span className="quantity">Qty:{product.quantity}</span>
                  </div>
                </div>
              );
            }
          })
        : "NO ITEMS IN CART"}

    
    </div>
  );
}

export default MiniCart;
