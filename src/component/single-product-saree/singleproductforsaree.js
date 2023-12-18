import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styleforsaree.css";
export const SareeDetail = () => {
  const location = useLocation("");
  console.log("locationofdata: ", location);

  const sareeId = location.state;
  console.log("sareeId: ", sareeId);
  let loginuser = localStorage.getItem("CustomerEmail");
  console.log("loginuser from saree: ", loginuser);
  const [currentdatasaree, setCurrentDataSaree] = useState([
    {
      price: "",
      brandname: "",
      image: "",
    },
  ]);
  const [cartdataofsaree, setCartDataOfSaree] = useState([]);

  const [quantity, setQuantity] = useState();
  const handleSareeQuantity = (e) => {
    setQuantity(e.target.value);
  };
  currentdatasaree.quantity = quantity;

  currentdatasaree.cartby = loginuser;

  useEffect(() => {
    if (sareeId) {
      let urlString = " http://localhost:4000/traditional-saree/" + sareeId;
      console.log("urlString: ", urlString);
      axios({
        method: "get",
        url: urlString,
      }).then((response) => {
        setCurrentDataSaree(response.data);
      });
    }
    axios({
      method: "get",
      url: "http://localhost:4000/cartproductdetail",
    }).then((response) => {
      setCartDataOfSaree(response.data);
    });
  }, []);

  const addProductToCart = () => {
    if (loginuser === null) {
      alert("Please register in the application");
    } else {
      currentdatasaree.productId = currentdatasaree.id;
      delete currentdatasaree.id;
      let result = cartdataofsaree.filter((response) => {
        if (
          response.productId === currentdatasaree.productId &&
          response.cartby === currentdatasaree.cartby
        ) {
          return response;
        }
      });

      console.log("currentdatasareeview: ", currentdatasaree);
       
      if (result.length == 0) {
        axios({
          method: "post",
          url: "http://localhost:4000/cartproductdetail",
          data: currentdatasaree,
        }).then((response) => {
          alert("Data saved successfully");
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
          <img src={currentdatasaree.image}></img>
        </div>
        <div className="image-container">
          <h1>Shop/Saree</h1>
          <h2>Men's Fashion T-Shirt</h2>

          <br></br>
          <input
            type="number"
            min="1"
            max="5"
            value={quantity}
            onChange={handleSareeQuantity}
          ></input>
          <button onClick={addProductToCart}>Add to Cart</button>
          <h2>{currentdatasaree.price}</h2>
          <h2>Product Details</h2>
          <span>
            A sari (sometimes also saree or shari) is a women's garment from the
            Indian subcontinent, that consists of an un-stitched stretch of
            woven fabric arranged over the body as a robe, with one end attached
            to the waist, while the other end rests over one shoulder as a stole
            (shawl), sometimes baring a part of the midriff.
          </span>
        </div>
      </section>
    </div>
    // <div>
    //   <section id="main-div">
    //     <div className="img-content">
    //       <img src={currentdatasaree.image}></img>
    //     </div>

    //     <div className="img-content">
    //       <h1>Shop/Traditional-Saree</h1>
    //       <h2>Women's Saree</h2>

    //       <select>
    //         <option>Select Size</option>
    //         <option>XL</option>
    //         <option>XXl</option>
    //         <option>Small</option>
    //         <option>Large</option>
    //       </select>

    //       <input type="number" value="1"></input>
    //       <button>Add to Cart</button>
    //       <h2>{currentdatasaree.price}</h2>
    //       <h2>Product Details</h2>
    //       <span>
    //         A sari (sometimes also saree or shari) is a women's garment from the
    //         Indian subcontinent, that consists of an un-stitched stretch of
    //         woven fabric arranged over the body as a robe, with one end attached
    //         to the waist, while the other end rests over one shoulder as a stole
    //         (shawl), sometimes baring a part of the midriff.
    //       </span>
    //     </div>
    //   </section>
    // </div>
  );
};
