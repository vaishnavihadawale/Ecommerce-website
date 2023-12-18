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
    },
  ]);
  const [cartdata, setCartData] = useState([]);
 
  womendressdata.quantity = kurtasetquantity;
  womendressdata.cartby = loginuser;
  console.log('cartdata: ', cartdata);
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
    if(loginuser === null){
      console.log('loginuser kurta set: ', loginuser);
      alert("Please register the application");
    }
    else{
    womendressdata.productId=womendressdata.id;
    delete womendressdata.id;
    console.log(" after delete of id womendressdata: ", womendressdata.productId);
    console.log(" after delete of id womendressdata: ", womendressdata.cartby);

    let resultantData = cartdata.filter((user) => {
       if (user.productId === womendressdata.productId && user.cartby === womendressdata.cartby) {
        
         return user;
       }
     });
     console.log("resultantData: ", resultantData.length);
     console.log("resultantData: ", resultantData);
    if(resultantData.length == 0){
      axios({
        method: "post",
        url: " http://localhost:4000/cartproductdetail",
        data: womendressdata,
      }).then((response) => {
        alert("Prduct Add To Cart Successfully");
      });
    }else{
        alert("Product already in cart");
    }
  }
  };

  return (
    <div>
      <section id="single-product">
        <div className="image-container">
          <img src={womendressdata.image}></img>
          
        </div>
        <div className="image-container">
          <h1>Shop/ Women Ethenic Wear</h1>
          <h2>Women's Ethenic Wear</h2>

          <br></br>
          <input
            type="number"
            min="1"
            max="5"
            value={kurtasetquantity}
            onChange={handleDressQuantity}
          ></input>
          <button onClick={addToDatabase}>Add to Cart</button>

          <h2>{womendressdata.price}</h2>
          <h2>Product Details</h2>
          <span>
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
