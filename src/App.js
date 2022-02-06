import  {React, useState, useEffect } from "react";
import MiniCart from "./MiniCart";
import ProductContainer from './ProductContainer';
import cart from "./cart.svg";
import caretdown from "./caret-down.svg";
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

  // To toggle minicart on click of minicart icon
  const ToggleCart = () => {
    setVisible(!visible);
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
          <span>{item}&nbsp;items <span><img src={caretdown} className={`${visible ? "caret-down" : "caret-up"} caret`}></img></span></span>
          
					<span className="cart_image"><img className="svg-size" src={cart} alt="cart" onClick={ToggleCart} ></img></span> 
        </div>
          {/* Conditional rendering to show/hide Mini Cart based on state */}
          {/* I would have shown animation to cart toggle, by toggling class based on state but currently I am rendering full component on state change. */}
         
          {/* If you want to see animation for toggle comment out Line no 66 below this and uncomment Line no 67 below I have already written CSS for the same */}
        {visible ? (<MiniCart products={products} setProducts={setProducts} cost={cost} item={item} visible={visible}/>) : ("")}
        {/* <MiniCart products={products} setProducts={setProducts} cost={cost} item={item} visible={visible}/> */}
      </header>

						<ProductContainer products={products} setProducts={setProducts}/>
     
    </div>
  );
}
