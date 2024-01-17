import "./navbar.css";
import { RiShoppingBagLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export const Navbar = () => {
  const navigate = useNavigate();

  let isLoggedIn = localStorage.getItem("CustomerEmail");
  const goToShop = () => {
    navigate("/shop");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToCart = () => {
    {
      isLoggedIn !== null && navigate("/cart");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goToLogin = () => {
    navigate("/login");
  };
  const goToLogout = () => {
    localStorage.removeItem("CustomerEmail");
  };
  const goToMyOrder = () => {
    {
      isLoggedIn !== null && navigate("/myorder");
    }
  };
  return (
    <div>
      <div className="header">
        <div className="logo">Amora</div>
        <ul id="navbar">
          <li>
            <a onClick={goToHome} className="active" href="#">
              Home
            </a>
          </li>
          <li>
            <a onClick={goToShop} href="#">
              Shop
            </a>
          </li>
          {isLoggedIn == null && (
            <li>
              <a onClick={goToRegister} href="#">
                Register
              </a>
            </li>
          )}
          {isLoggedIn == null && (
            <li>
              <a href="#" onClick={goToLogin}>
                Login
              </a>
            </li>
          )}
          <li>
            <a href="#" onClick={goToMyOrder}>
              My Order
            </a>
          </li>
          {isLoggedIn !== null && (
            <li>
              <a href="#" onClick={goToLogout}>
                Logout
              </a>
            </li>
          )}
          <li>
            <a href="#" onClick={goToCart}>
              <RiShoppingBagLine fontSize={26} />
            </a>
          </li>

          {/* <li className="dropdown">
            <a href="#">
              <CgProfile fontSize={26} />
            </a>
            <li className="dropdown-content">
              <a href="#">Name</a>
              <a href="Logout"></a>
            </li>
          </li> */}
        </ul>
      </div>
    </div>
  );
};
