import "./shop.css";
import { useNavigate } from "react-router-dom";
export const Shop = () => {
  const navigate = useNavigate();

  const goToMensWear = () => {
    navigate("/menswear");
  };
  const goToWomensWear = () => {
    navigate("/womenswear");
  };
  const goToDressWear=()=>{
    navigate('/shopforwomen');
  }
  const goToMenTraditional=()=>{
    navigate('/traditionalformen')
  }
  return (
    <div>
      <section id="banner">
        <img src="/assets/banner/banner.jpg"></img>
        <h1 className="centered">Upto 50% Off - On All Products</h1>
        <h5 className="centered">Explore More</h5>
      </section>

      <section id="sm-banner">
        <div className="banner-box">
          <img src="/assets/banner/banner-2.jpg"></img>
          <h1>Women Dresses</h1>
          <h2>The best classic  for women at amora</h2>
          <button onClick={goToDressWear}>Learn More</button>
        </div>
        <div className="banner-box">
          <img src="/assets/banner/banner-3.jpg"></img>
          <h1 className="text-left">Men Clothing</h1>
          <h2 className="text-align">
            The best classic dress for men at amora
          </h2>
          <button onClick={goToMensWear} className="button-left">
            Learn More
          </button>
        </div>

        <div className="banner-box">
          <img src="/assets/banner/saree-women.jpeg"></img>
          <h1 className="text-left">Traditional for Women</h1>
          <h2 className="text-align">Weaving Dreams, One Saree at a Time.</h2>
          <button onClick={goToWomensWear} className="button-left">
            Learn More
          </button>
        </div>
        <div className="banner-box">
          <img src="/assets/banner/kurtas.webp"></img>
          <h1 className="text-left">Men Clothing</h1>
          <h2 className="text-align">
            The best classic dress for men at amora
          </h2>
          <button onClick={goToMenTraditional} className="button-left">Learn More</button>
        </div>
      </section>
    </div>
  );
};
