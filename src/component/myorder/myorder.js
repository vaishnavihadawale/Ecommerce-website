import axios from "axios";
import { useEffect, useState } from "react";

export const MyOrder = () => {
  let Activeuser = localStorage.getItem("CustomerEmail");
  const [purchasedata, setPurchaseData] = useState([]);
  console.log("purchasedata: ", purchasedata);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/purchasehistoryofuser",
    }).then((Response) => {
      setPurchaseData(Response.data);
    });
  }, []);

  let myOrderUserHistory = purchasedata.filter((data) => {
    console.log("data.cartby: ", data.cartby);
    if (data.cartby === Activeuser) {
      return data;
    }
  });
  console.log("myOrderUserHistory: ", myOrderUserHistory);
    
  const productPrice=()=>{
   let data=myOrderUserHistory.map((element)=>{
   let price =element.price*element.quantity;
      return price;
      
      
    })
    console.log("Data of order",  data);
  }
  return (
    <div>
      {myOrderUserHistory.map((buyproduct) => {
        return (
          <section id="cart-section">
            <div className="cart-container">
              <img src={buyproduct.image}></img>
            </div>
            <div className="cart-container">
              <h2>{buyproduct.brandname}</h2>
            </div>
            <div className="cart-container">
              <h2>{buyproduct.size}</h2>
            </div>
            <div className="cart-container">
              <h2>{buyproduct.quantity}</h2>
            </div>
            <div className="cart-container">
              <h2>{buyproduct.price*buyproduct.quantity}</h2>
            </div>
          </section>
        );
      })}
    </div>
  );
};
