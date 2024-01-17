import axios from "axios";
import { useEffect, useState } from "react";
import "./menscasualshirt.css";
export const MenkurtaSet = () => {
  const [dataofcasualshirt, setDataOfCasualShirt] = useState([]);

  useEffect(() => {
    getDataOfCasualShirt();
  }, []);
  const getDataOfCasualShirt = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/men-casual-shirt",
    }).then((response) => {
        console.log('response of casual shirt: ', response);
      setDataOfCasualShirt(response.data);
    });
  };
  return (
    <div>
      <section id="product-section">
        {dataofcasualshirt.map((casualshirt) => {
          return (
            <div className="product">
              <img src={casualshirt.image}></img>

              <span>{casualshirt.brandname}</span>
              <h5>{casualshirt.price}</h5>
            </div>
          );
        })}
      </section>
    </div>
  );
};
