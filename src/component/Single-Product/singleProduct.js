import "./single-product.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const SingleProduct = () => {
  const navigate = useNavigate();
  const location = useLocation("");
  console.log("location1234: ", location);
  const idOfEachTshirt = location.state;
  console.log("idOfEachTshirt: ", idOfEachTshirt);
  console.log("location?.state?: ", location.state);
  let addtocartBy = localStorage.getItem("CustomerEmail");
  console.log("addtocartBy : ", addtocartBy);

  const [quantityofproduct, setQuantityOfProduct] = useState();
  const [sizeofproduct, setSizeOfProduct] = useState();
  console.log("sizeofproduct: ", sizeofproduct);
  const [tshirtdata, setTshirtData] = useState([
    { brandname: "", price: "", image: "" },
  ]);

  const [savedata, setSaveData] = useState([]);
  tshirtdata.cartby = addtocartBy;
  let copyquantity = quantityofproduct;
  console.log("copyquantity: ", copyquantity);
  tshirtdata.quantity = copyquantity;

  let copysize = sizeofproduct;
  tshirtdata.size = copysize;
  useEffect(() => {
    if (idOfEachTshirt) {
      let urlString = "http://localhost:4000/menswear/" + idOfEachTshirt;
      console.log("urlString: ", urlString);
      axios({
        method: "get",
        url: urlString,
      }).then((response) => {
        console.log("responseof prod: ", response);
        console.log("response.data: ", response.data);
        setTshirtData(response.data);
      });
      axios({
        method: "get",
        url: "http://localhost:4000/cartproductdetail",
      }).then((response) => {
        setSaveData(response.data);
      });
    }
  }, []);

  const handlequantity = (e) => {
    setQuantityOfProduct(e.target.value);
  };

  const handlesize = (e) => {
    setSizeOfProduct(e.target.value);
  };
  console.log("After deletion of keytshirtdata: ", tshirtdata);
  console.log("setTshirtData12: ", tshirtdata);
  const [cartdata, setCartData] = useState([{}]);
  console.log("cartdata: ", cartdata);

  const goToCart = (shirtid) => {
    console.log("shirtid: ", shirtid);
    if (addtocartBy === null) {
      alert("Please Register To Application");
    } else {
      console.log("tshirtdataview: ", tshirtdata);
      savedata.productId = savedata.id;
      delete savedata.id;
      let filterData = savedata.filter((data) => {
        if (
          data.productId === tshirtdata.productId &&
          data.cartby === tshirtdata.cartby
        ) {
          return data;
        }
      });
      if (filterData.length == 0) {
        axios({
          method: "post",
          url: "http://localhost:4000/cartproductdetail",
          data: tshirtdata,
        }).then((response) => {
          alert(" Data saved successfully");
        });
      } else {
        alert("Product already in cart");
      }
    }
  };
  return (
    <div>
      <section id="single-product">
        <div className="image-container">

          <img src={tshirtdata.image}></img>
        </div>
        <div className="image-container">
          <h2>{tshirtdata.brandname}</h2>
          <hr></hr>
          <br></br>
          <h2>₹{tshirtdata.price}</h2>
          <p>inclusive of all taxes</p>
          <br></br>
          <h3>Select Size</h3>
          
          <div className="select-size">
            <button className="round-button" onClick={() => handlesize("S")}>
              S
            </button>
            <button className="round-button" onClick={() => handlesize("M")}>
              M
            </button>
            <button className="round-button" onClick={() => handlesize("L")}>
              L
            </button>
            <button className="round-button" onClick={() => handlesize("XL")}>
              XL
            </button>
            <button
              className="round-button"
              onClick={() => handlesize("XXL")}
            >
              XXL
            </button>
          </div>
          <br></br>
          <input
            type="number"
            min="1"
            max="5"
            value={quantityofproduct}
            onChange={handlequantity}
          ></input>
          <button onClick={() => goToCart(tshirtdata.id)}>Add to Cart</button>
          <h2>{tshirtdata.price}</h2>
          <h2>Product Details</h2>
          <span>
            Our t-shirts are crafted with 100% cotton fabric with features like
            super combed yarn, fabric of 180-200 GSM, superior dyeing, colour
            fastness and with a long lasting sheen, they are worth every penny
            you spend. On this fabric, you may print using sublimation, DTF,
            screen printing, and dark fabric. The ink is then heated using
            machines till the fabric of the t-shirt starts to absorb it. All of
            our prints are durable and endure for years without fading or
            scratching.
          </span>
        </div>
      </section>
    </div>
  );
};
