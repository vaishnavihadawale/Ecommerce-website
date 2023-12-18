import "./womenswear.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const ShopForWomen = () => {
  const [sareedata, setSareeData] = useState([]);
   const navigate=useNavigate();
  useEffect(() => {
    getSareeData();
  }, []);
  const getSareeData = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/traditional-saree",
    }).then((response) => {
      console.log("response: ", response);
      setSareeData(response.data);
    });
  };
  console.log('sareedata: ', sareedata);
    
  const goToSareeDetail=(sareeid)=>{
    navigate('/singleProductSaree',{state:sareeid});
  }
  return (
    <div>
      <section id="main-section">
        {sareedata.map((dataofsaree)=>{
        return(<div className="second-container">
          <img onClick={()=>goToSareeDetail((dataofsaree.id))} src={dataofsaree.image}></img>
          <h2>{dataofsaree.brandname}</h2>
          <h2>{dataofsaree.price}</h2>
       
        </div>
        )
        }
        )}
      </section>
    </div>
  );
};
