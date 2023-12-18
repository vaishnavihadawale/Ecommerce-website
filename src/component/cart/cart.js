import { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate=useNavigate();
  const [cartproduct, setCartProduct] = useState([{}]);
  let loginUser = localStorage.getItem("CustomerEmail");
  console.log("loginUser: ", loginUser);

  useEffect(() => {
    displayData();
  }, []);
  const displayData = () => {
    let urlString = "http://localhost:4000/cartproductdetail";
    axios({
      method: "get",
      url: urlString,
    }).then((Response) => {
      console.log("ResponseOfCart: ", Response);
      setCartProduct(Response.data);
    });
  };

  console.log("cartproduct: ", cartproduct);

  const handleDelete = (pid) => {
    axios({
      method: "delete",
      url: "http://localhost:4000/cartproductdetail/" + pid,
    }).then((Response) => {
      alert("Removed from cart");
      displayData();
    });
  };

  const goToPurchase = (dataId) => {
  navigate('/productpurchase',{state:dataId});
  };
  return (
    <div>
      {cartproduct.map((product) => {
        console.log("product: ", product);
        if (loginUser === product.cartby) {
          console.log("cartproduct.cartby: ", product.cartby);
          return (
            <section id="cart-section">
              <div className="cart-container">
                <img src={product.image}></img>
              </div>
              <div className="cart-container">
                <h2>{product.brandname}</h2>
              </div>
              <div className="cart-container">
                <h2>{product.size}</h2>
              </div>
              <div className="cart-container">
                <h2>{product.quantity}</h2>
              </div>
              <div className="cart-container">
                <h2 onClick={()=>goToPurchase(product.id)}>Purchase Now</h2>
                <h2>{product.price}</h2>
              </div>
              <div className="cart-container">
                <MdDelete
                  onClick={() => handleDelete(product.id)}
                  fontSize={36}
                />
              </div>
            </section>
          );
        } else {
          <h1>Nothing in cart</h1>;
        }
      })}
    </div>
  );
};
