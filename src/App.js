import  {React, useState, useEffect } from "react";
import MiniCart from "./MiniCart";
import cart from "./delivery-cart-svgrepo-com.svg";
import product2 from "./ad-product-svgrepo-com.svg";
import minus from "./minus-svgrepo-com.svg";
import plus from "./plus-svgrepo-com.svg";

import "./App.css";

export default function App() {
  // Storing all products data
  const [products, setProducts] = useState([]);
  // state to toggle minicart
  const [visible, setVisible] = useState(false);


// this will fetch products and store them in the above state
useEffect(() => {
  JSON.parse(localStorage.getItem("products"))?.length ? setProducts(JSON.parse(localStorage.getItem("products"))) :
    fetch("https://dnc0cmt2n557n.cloudfront.net/products.json")
      .then((res) => res.json())
      .then((json) => {
        let temp = [];
        json.products.forEach((element) => {
          element["quantity"] = 1;
          temp.push(element);
        });
        console.log(temp);
        setProducts(temp);
      });
}, []);

  
//storing data into local storage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

//decrecement the product quantity when user clicks on "-" symbol and also prevents the quantity to be in negative values
  const decrementCounter = (user) => {
    const UpdateProduct = products.map((prod) =>
      prod.id === user.id
        ? { ...prod, quantity: prod.quantity === 0 ? 0 : prod.quantity - 1 }
        : prod
    );
    setProducts(UpdateProduct);
  };
 
//increment the product quantity when user clicks on "+" symbol
  const incrementCounter = (user) => {
    const UpdateProduct = products.map((prod) => {
      return prod.id === user.id ? { ...prod, quantity: prod.quantity + 1 } : prod
    }
    );
    setProducts(UpdateProduct);
  };

  //To toggle minicart on click of minicart icon
  const ToggleCart = () => {
    setVisible(!visible);
    console.log("clicked", { visible });
  };

  let cost = 0;
  products.map((e) => {
    return cost += e.price * e.quantity;
  });

  let item = 0;
  products.map((e) => {
    return e.quantity > 0 ? item += 1 : "";
  });


  return (
    <div className="ProductContainer">
      <header>
        <h1>Products</h1>
        <div className="cart-header">
          <span style={{ fontWeight: "bold" }}> ${cost} </span>
          <span>{item}&nbsp; items</span>
          <img className="svg-size" src={cart} alt="cart" onClick={ToggleCart} ></img>
        </div>
        {/* Conditional rendering to show/hide Mini Cart based on state */}
        {visible ? (<MiniCart products={products} setProducts={setProducts} cost={cost} item={item} visible={visible}/>) : ("")}
      </header>


      <div className="cart_products_container">
        {products.map((product) => {
          return (
            <div key={product.id} className="cart_products">
              <span> <img src={product2} className="svg-size" alt="product" ></img> </span>
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
    </div>
  );
}
