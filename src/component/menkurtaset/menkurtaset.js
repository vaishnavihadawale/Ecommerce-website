import axios from "axios";
import { useEffect, useState } from "react";
import "./menscasualshirt.css";
import { useNavigate } from "react-router-dom";
export const MenkurtaSet = () => {

    const navigate=useNavigate();

    const singleShirtInfo=(shirtid)=>{
        console.log('casual shirtid: ', shirtid);

        navigate("/singleshirtdetail",{state:shirtid})

    }
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
              <img src={casualshirt.image} onClick={()=>{singleShirtInfo(casualshirt.id)}}></img>

              <span>{casualshirt.brandname}</span>
              <h5>{casualshirt.price}</h5>
            </div>
          );
        })}
      </section>
    </div>
  );
};
