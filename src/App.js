import React, { useState } from "react";
import MiniCart from "./MiniCart";
import cart from "./delivery-cart-svgrepo-com.svg";
import product2 from "./ad-product-svgrepo-com.svg";
import "./App.css";
export default function App() {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
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

  const decrementCounter = (user) => {
    const UpdateProduct = products.map((prod) =>
      prod.id === user.id
        ? { ...prod, quantity: prod.quantity === 0 ? 0 : prod.quantity - 1 }
        : prod
    );
    setProducts(UpdateProduct);
  };

  const incrementCounter = (user) => {
    const UpdateProduct = products.map((prod) =>
      prod.id === user.id ? { ...prod, quantity: prod.quantity + 1 } : prod
    );
    setProducts(UpdateProduct);
  };

  const ToggleCart = () => {
    setVisible(!visible);
    console.log("clicked", { visible });
  };

  let cost = 0;
  products.map((e) => {
    cost += e.price * e.quantity;
  });

  let item = 0;
  products.map((e) => {
    if (e.quantity > 0) {
      item += 1;
    }
  });

  let curr = "";
  products.map((e) => {
    if (e.currency) {
      curr = e.currency;
    }
  });
  return (
    <div className="ProductContainer">
      <h1>Products</h1>
      <div className="cart-header">
        <span style={{fontWeight:"bold"}}> {curr}{cost} </span>
        <span>{item}&nbsp; items</span>
        <img className="svg-size" src={cart} alt="cart" onClick={ToggleCart} ></img>
      </div>

      {visible ? (
        <MiniCart
          products={products}
          setProducts={setProducts}
          cost={cost}
          item={item}
        />
      ) : (
        ""
      )}


      <div>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <span>
                <img
                  src={product2}
                  lt="product"
                  className="svg-size"
                  alt="product"
                ></img>
              </span>
              <span>{product.title}</span>
              <span>{product.desc}</span>
              <button onClick={() => decrementCounter(product)}> - </button>
              <input
                className="inp-box"
                type="text"
                value={product.quantity}
              ></input>
              <button onClick={() => incrementCounter(product)}> + </button>
              <span>
                {product.currency}
                {product.price}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
