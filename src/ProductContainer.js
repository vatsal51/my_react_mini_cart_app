import React from 'react';
import product_img from "./product_image.svg";
import minus from "./minus.svg";
import plus from "./plus.svg";
// import "./App.css";

function CartProductContainer({products,setProducts}) {
	//decrement the product quantity when user clicks on "-" symbol and preventing going into negative value
    const decrementCounter = (item) => {
        const UpdateProduct = products.map((prod) => 
								prod.id === item.id ? { ...prod, quantity: prod.quantity === 0 ? 0 : prod.quantity - 1 } : prod );
// updating the state with decremented value
        setProducts(UpdateProduct);
      };
     
    //increment the product quantity when user clicks on "+" symbol
      const incrementCounter = (item) => {
        const UpdateProduct = products.map((prod) => 
        prod.id === item.id ? { ...prod, quantity: prod.quantity + 1 } : prod
        );
// updating the state with incremented value
        setProducts(UpdateProduct);
      };

  return (
    <div className="cart_products_container">
    {products.map((product) => {
      return (
        <div key={product.id} className="cart_products">
          <span className='cart_products_image'> <img src={product_img} className="svg-size" alt="product" ></img> </span>
          <span className="cart_product_title">
            <div>{product.title}</div>
            <div>{product.desc}</div>
          </span>
          <div style={{ display: "flex" }}>
            <img src={minus} alt="minus symbol" onClick={() => decrementCounter(product)}></img>
            <input className="inp-box" type="text" readOnly={true} value={product.quantity} ></input>
            <img src={plus} alt="plus symbol" onClick={() => incrementCounter(product)}></img>
          </div>
          <span className="cart_product_price"> {product.currency} {product.price} </span>
        </div>
      );
    })}
  </div>
  );
}

export default CartProductContainer;
