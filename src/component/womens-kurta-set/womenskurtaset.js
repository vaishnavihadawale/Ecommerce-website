import { useEffect, useState } from "react";
import "./womensproduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const WomenKurtaSet = () => {
  const navigate = useNavigate();
  const [dataofdress, setDataOfDress] = useState([]);

  useEffect(() => {
    let urlString = " http://localhost:4000/womendres";
    axios({
      method: "get",
      url: urlString,
    }).then((response) => {
      console.log("response of kurta set object: ", response);
      setDataOfDress(response.data);
    });
  }, []);

  const handleProductDetail = (kurtasetId) => {
    console.log('kurtasetId for function: ', kurtasetId);
    
    navigate('/womenethenicwear', { state: kurtasetId });
  };
  return (
    <div>
      <section id="main-section-data">
        {dataofdress.map((dress) => {
          return (
            <div className="inner-container">
              <img
                onClick={() => handleProductDetail(dress.id)}
                src={dress.image}
              ></img>
              <h2>{dress.productname}</h2>
              <h2>{dress.price}</h2>
            </div>
          );
        })}
      </section>
    </div>
  );
};
