import axios from "axios";
import { useState, useEffect } from "react";
import "./menswear.css";
import { useNavigate } from "react-router-dom";
export const MensWear = () => {
  const navigate = useNavigate();

  const singleProduct = (tshirtId) => {
    console.log("tshirtId: ", tshirtId);
    navigate("/singleproduct", { state: tshirtId });
  };
  const [menstshirtdata, setMensTshirtData] = useState([]);

  useEffect(() => {
    getMenTshirtData();
  }, []);

  const getMenTshirtData = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/menswear",
    }).then((response) => {
      console.log("response: ", response);
      setMensTshirtData(response.data);
    });
  };
  console.log("data of t-shirt", menstshirtdata);
  return (
    <div>
      <section id="mens-product">
        {menstshirtdata.map((tshirt) => {
          return (
            <div className="product-container">
              <img
                onClick={() => singleProduct(tshirt.id)}
                src={tshirt.image}
              ></img>

              <span>{tshirt.brandname}</span>
              <h5>{tshirt.price}</h5>
            </div>
          );
        })}
      </section>
    </div>
  );
};
