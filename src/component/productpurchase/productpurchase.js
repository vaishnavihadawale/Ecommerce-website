import { useLocation } from "react-router-dom";
import "./productpurchase.css";
import { useEffect, useState } from "react";
import axios from "axios";
export const ProductPurchase = () => {
  const loginUser = localStorage.getItem("CustomerEmail");
  const location = useLocation("");
  const data = location.state;
  console.log("data: ", data);
  const [pincode, setPincode] = useState();
  const [state, setState] = useState();
  const [mobile, setMobile] = useState();
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

  const [purchasehistory, setPurchaseHistory] = useState({});

  purchasehistory.address = address;
  purchasehistory.mobile = mobile;
  purchasehistory.customername = customername;
  purchasehistory.state = state;
  purchasehistory.pincode = pincode;
  purchasehistory.purchaseproduct = purchasedata;
  console.log("purchasehistory", purchasehistory);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/cartproductdetail/",
    }).then((response) => {
      console.log("response of purchase: ", response);

      setPurchaseData(response.data);
    });
  }, []);
  console.log("loginUser: ", loginUser);
  const loginuserData = purchasedata.filter((data) => {
    if (loginUser === data.cartby) {
      return data;
    }
  });

  const initialValue = 0;
  const totalSum = loginuserData.reduce((accumulator, currentValue) => {
    return parseInt(accumulator) + parseInt(currentValue.price);
  }, initialValue);
  purchasehistory.TotalAmount = totalSum;

  console.log("totalsum", totalSum);
  console.log("loginuserData: ", loginuserData);
  const handleState = (e) => {
    setState(e.target.value);
  };
  const handlePincode = (e) => {
    setPincode(e.target.value);
  };
  const handleMobileNumber = (e) => {
    setMobile(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  console.log("addresss", address);
  const handleName = (e) => {
    setCustomerName(e.target.value);
  };
  const submitPurchaseHistory = () => {
    const purchasetime = new Date();
    console.log("purchaseTime: ", purchasetime);
    purchasehistory.purchaseTime = purchasetime;
    console.log("purchasehistory: ", purchasehistory);

    axios({
      method: "post",
      url: " http://localhost:4000/purchasehistoryofuser",
      data: purchasehistory,
    }).then((response) => {
      alert("Order is placed");
    });
  };
  const length = Object.keys(loginuserData).length;
  console.log("length: ", length);
  return (
    <div id="purchase-section">
      <div className="purchase-product">
        <p>Contact Details</p>
        <label> Name</label>
        <br></br>
        <input
          type="text"
          value={customername}
          onChange={handleName}
          required
        ></input>
        <br></br>
        <label>Mobile No.</label>
        <br></br>
        <input type="text" value={mobile} onChange={handleMobileNumber}></input>
        <br></br>
        <p>Address</p>
        <label>Pin Code</label>
        <br></br>
        <input type="text" value={pincode} onChange={handlePincode}></input>
        <br></br>
        <label>Home Address</label>
        <br></br>
        <input type="text" value={address} onChange={handleAddress}></input>
        <br></br>
        <label>State</label>
        <br></br>
        <input type="text" value={state} onChange={handleState}></input>
        <br></br>
      </div>
      <div className="purchase-product">
        <p>Price Details </p>
        <p>Number of product : {length}</p>
        <p>Shipping Fee : Free</p>
        <p>Total Amount : {totalSum}</p>
        <button onClick={submitPurchaseHistory}>Place Order</button>
      </div>
    </div>
  );
};
