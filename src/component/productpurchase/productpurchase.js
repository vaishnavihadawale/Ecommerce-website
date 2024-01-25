import { useLocation } from "react-router-dom";
import "./productpurchase.css";
import { useEffect, useState } from "react";
import axios from "axios";
export const ProductPurchase = () => {
  const location = useLocation("");
  const data = location.state;
  console.log("data: ", data);
  const [address, setAddress] = useState();
  const [customername, setCustomerName] = useState();
  const [purchasedata, setPurchaseData] = useState([
    {
      Productname: "",
      cartby: "",

      image: "",
      price: "",
      productId: "",
      quantity: "",
    },
  ]);
  purchasedata.address = address;
  purchasedata.customername = customername;
  console.log("purchasedata: ", purchasedata);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/cartproductdetail/" + data,
    }).then((response) => {
      console.log("response of purchase: ", response);

      setPurchaseData(response.data);
    });
  }, []);

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleName = (e) => {
    setCustomerName(e.target.value);
  };
  const submitPurchaseHistory = () => {
    let key = "id";
    delete purchasedata[key];
    axios({
      method: "post",
      url: " http://localhost:4000/purchasehistoryofuser",
      data: purchasedata,
    }).then((response) => {
      alert("Order is placed");
    });
  };

  return (
    
    <div id="purchase-section">
      <div className="purchase-product">
        <img src={purchasedata.image}></img>
      </div>

      <h4>Product name : {purchasedata.Productname}</h4>
      <h4>Product Price : {purchasedata.price}</h4>
      <h4>ProductId:{purchasedata.productId}</h4>
      <h4>Quantity of product:{purchasedata.quantity}</h4>
      <h4>Actual price:{purchasedata.quantity*purchasedata.price}</h4>
      <label>Customer Name</label>
      <br></br>
      <input type="text" value={customername} onChange={handleName}></input>
      <br></br>
      <label>Address of delivery</label>
      <br></br>
      <input type="text" value={address} onChange={handleAddress}></input>
      <br></br>
      <span>Payment mode: Only cash on delivery</span>
      <br></br>
      <button onClick={submitPurchaseHistory}>Place Order</button>
    </div>
    
  );
};
