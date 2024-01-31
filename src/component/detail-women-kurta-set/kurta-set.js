import { useEffect, useState } from "react";
import "./kurta-set.css";
import axios from "axios";

import { useLocation } from "react-router-dom";
export const WomensEthenicWear = () => {
  const location = useLocation();
  const kurtaSetId = location.state;
  console.log("kurtaSetId: ", kurtaSetId);

  let loginuser = localStorage.getItem("CustomerEmail");

  const [kurtasetquantity, setKurtaSetQuantity] = useState();
  const [womendressdata, setWomenDressData] = useState([
    
    {
      image: "",
      productname: "",
      price: "",
      productdesc: "",
    },
  ]);
  
  const [kurtasize, setKurtaSize] = useState();
  const handleSizeOfProduct = (value) => {
    console.log("value: ", value);
    setKurtaSize(value);
  };
  console.log("kurta set size", kurtasize);
  let copyKurtaSize = kurtasize;
  womendressdata.size = copyKurtaSize;
  const [cartdata, setCartData] = useState([]);

  womendressdata.quantity = kurtasetquantity;
  womendressdata.cartby = loginuser;
  console.log('womendressdata: ', womendressdata);
  console.log("cartdata: ", cartdata);
  useEffect(() => {
    if (kurtaSetId) {
      axios({
        method: "get",
        url: "http://localhost:4000/womendres/" + kurtaSetId,
      }).then((response) => {
        console.log("response of data by id: ", response);
        setWomenDressData(response.data);
      });
    }
    axios({
      method: "get",
      url: "http://localhost:4000/cartproductdetail",
    }).then((response) => {
      console.log("response for filter : ", response);
      setCartData(response.data);
    });
  }, []);
  console.log("image path", womendressdata);
  const handleDressQuantity = (e) => {
    setKurtaSetQuantity(e.target.value);
  };

  const addToDatabase = () => {
    if (loginuser === null) {
      console.log("loginuser kurta set: ", loginuser);
      alert("Please register the application");
    } else {
      womendressdata.productId = womendressdata.id;
      delete womendressdata.id;
      console.log(
        " after delete of id womendressdata: ",
        womendressdata.productId
      );
      console.log(
        " after delete of id womendressdata: ",
        womendressdata.cartby
      );

      let resultantData = cartdata.filter((user) => {
        if (
          user.productId === womendressdata.productId &&
          user.cartby === womendressdata.cartby
        ) {
          return user;
        }
      });
      console.log("resultantData: ", resultantData.length);
      console.log("resultantData: ", resultantData);
      if (resultantData.length === 0) {
        axios({
          method: "post",
          url: " http://localhost:4000/cartproductdetail",
          data: womendressdata,
        }).then((response) => {
          alert("Prduct Add To Cart Successfully");
        });
      } else {
        alert("Product already in cart");
      }
    }
  };

  return (
    <div>
      <section id="section-div">
        <div className="divide-container">
          <img src={womendressdata.image} alt="kurta-set"></img>
        </div>
        <div className="divide-container">
          <h2>{womendressdata.Productname}</h2>
          <p>{womendressdata.ProductDescription}</p>
          <hr></hr>
          <br></br>
          <h2>₹{womendressdata.price}</h2>
          <p>inclusive of all taxes</p>
          <br></br>
          <h3>Select Size</h3>
          <div className="select-size">
            <button className="round" onClick={() => handleSizeOfProduct("S")}>
              S
            </button>
            <button className="round" onClick={() => handleSizeOfProduct("M")}>
              M
            </button>
            <button className="round" onClick={() => handleSizeOfProduct("L")}>
              L
            </button>
            <button className="round" onClick={() => handleSizeOfProduct("XL")}>
              XL
            </button>
            <button
              className="round"
              onClick={() => handleSizeOfProduct("XXL")}
            >
              XXL
            </button>
          </div>
          <h3>Quantity</h3>
          <br></br>

          <input
            type="number"
            min="1"
            max="5"
            value={kurtasetquantity}
            onChange={handleDressQuantity}
          ></input>

          <button className="add-to-cart" onClick={addToDatabase}>
            Add to cart
          </button>
          <br></br>
          <br></br>
          <h2>Product Details</h2>
          <span>
            <h4>This kurta set consists of kurta, palazzo and a dupatta</h4>
            Kurta sets for women are traditional Indian attire consisting of a
            kurta (a long tunic top) and a matching bottom such as salwar or
            churidar pants, or a skirt. Here are some popular types of kurta
            sets for women: Anarkali Kurta Set: This style features a flared
            kurta that is.
          </span>
        </div>
      </section>
    </div>
  );
};
