import {React, useState} from 'react';
import cart from "./delivery-cart-svgrepo-com.svg";
import MiniCart from "./MiniCart";

function Header({curr,cost,item,setProducts,products}) {
    const [visible, setVisible] = useState(false);

    const ToggleCart = () => {
        setVisible(!visible);
        console.log("clicked", { visible });
      };
  return (
    <header>
    <h1>Products</h1>
    <div className="cart-header">
      <span style={{fontWeight:"bold"}}> {curr}{cost} </span>
      <span>{item}&nbsp; items</span>
      <img className="svg-size" src={cart} alt="cart" onClick={ToggleCart} ></img>
    </div>
    {visible ? ( <MiniCart products={products} setProducts={setProducts} item={item} /> ) : ( "" )}
    </header>
    );
}

export default Header;
