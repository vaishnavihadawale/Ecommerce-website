import { useEffect, useState } from "react";
import "./casualshirt.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
export const CasualShirtInfo = () => {
  const location = useLocation("");
  const idOfCasualShirt = location.state;
  console.log("idOfCasualShirt: ", idOfCasualShirt);
  const [dataofsingleshirtbyid, setDataOfSingleShirtById] = useState({});
  const [shirtsize, setShirtSize] = useState();
  const handleSizeOfCasualShirt = (e) => {
    setShirtSize(e.target.value);
  };
  const [quantityofcasualshirt, setQuantityOfCasualShirt] = useState();
  const handleQuantityOfCasualShirt = (e) => {
    setQuantityOfCasualShirt(e.target.value);
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/men-casual-shirt/" + idOfCasualShirt,
    }).then((Response) => {
      console.log("Response of dataofsingleshirtbyid: ", Response);
      setDataOfSingleShirtById(Response.data);
    });
  }, []);
  return (
    <div>
      <section id="section-container">
        <div className="productinfo-section">
          <img src={dataofsingleshirtbyid.image}></img>
        </div>
        <div className="productinfo-section">
          <h1>Shop/Casual Shirt</h1>
          <h2>Men's Fashion Casual Shirt</h2>
          <h3>Select Size</h3>
          <select onChange={handleSizeOfCasualShirt}>
            <option value={shirtsize}>Xl</option>
            <option value={shirtsize}>XXl</option>
            <option value={shirtsize}>L</option>
            <option value={shirtsize}>Small</option>
            <option value={shirtsize}>Medium</option>
          </select><br></br>
          <h3>Product Quantity</h3>
          <input
            type="number"
            min="1"
            max="5"
            value={quantityofcasualshirt}
            onChange={handleQuantityOfCasualShirt}
          ></input>
          <h3> Price : {dataofsingleshirtbyid.Price} Rs </h3>
          <button>Add to Cart</button>
          <h2>Product Details :</h2>
          <span>
            Our casual shirts are crafted with 100% cotton fabric with features
            like super combed yarn, fabric of 180-200 GSM, superior dyeing,
            colour fastness and with a long lasting sheen, they are worth every
            penny you spend. On this fabric, you may print using sublimation,
            DTF, screen printing, and dark fabric. The ink is then heated using
            machines till the fabric of the casual-shirt starts to absorb it. All of
            our prints are durable and endure for years without fading or
            scratching.
          </span>
        </div>
      </section>
    </div>
  );
};
