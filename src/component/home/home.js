import "./home.css";
import { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export const Home = () => {
 
  const [product, setProduct] = useState([]);

  useEffect(()=>{
    console.log("useeffect call at start");
    getProduct();
  },[])
   const navigate=useNavigate();

   const goToShop=()=>{
    navigate('/shop');
   }
  const getProduct=()=>{
    axios(
      {
        method:'get',
        url:'http://localhost:4000/featuredproduct'
      }).then(response=>{
        console.log('res',response)
        setProduct(response.data);
        
      })
  }
  console.log('data ',product);
  return (
    <div>
      <section id="home">
        <img src="/assets/hero.png" alt="image"></img>
        <h2 class="bottom-left1">Trade-in-Offer</h2>
        <h3 class="bottom-left2">Super value deals</h3>
        <h4 class="bottom-left3">On all products</h4>
        <p class="bottom-left4">Save more with coupons and upto 70% off!</p>
        <button class="bottom-left5" onClick={goToShop}>Shop now</button>
      </section>
      <section id="feature" class="section-padding">
        <div class="feature-div1">
          <img src="/assets/online-order-2.jpg"></img>
          <h4>Online Order</h4>
        </div>
        <div class="feature-div1">
          <img src="/assets/free-shipping.jpg"></img>
          <h4>Free Shipping</h4>
        </div>
        <div class="feature-div1">
          <img src="/assets/save-money-2.webp"></img>
          <h4>Save Money</h4>
        </div>
       
        <div class="feature-div1">
          <img src="/assets/support.webp"></img>
          <h4>F24/7 Support</h4>
        </div>
      </section>
     
      <section id="headline">
      <h1>Featured Product</h1>
        <h3>Winter Collection New Modern Design</h3>
        </section>
      <section id="featured-product">
        
        {product.map((element)=>{
          return <div className="product-container">
          <img src={element.image}></img>
          <h5>{element.brandname}</h5>
          <h5>{element.price}</h5>
        </div>
        
         })
        }
      </section>
    </div>
  );
};
