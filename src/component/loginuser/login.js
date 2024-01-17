import axios from "axios";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationForLoginData } from "./validatelogin";


export const Login = () => {
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  

const navigate=useNavigate();

const gotoshop=()=>{
  navigate('/shop');
}
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...logindata, [name]: value });
  };
  const handleLogin = (e) => {
    
    e.preventDefault();
    console.log("logindata of user", logindata);

    let resultentUser = [];
    axios({
      method: "get",
      url: "http://localhost:4000/register-user",
    }).then((response) => {
      console.log("responsecheck: ", response);
      let registerUsers = response.data;
      console.log("registerUserscheck: ", registerUsers);
      console.log("registerUsers: ", registerUsers);
      resultentUser = registerUsers.filter((user) => {
        
        if (user.email === logindata.email) {
          if (user.password === logindata.password) {
            return user;
          }
        }
      });

      console.log("userfromfilter: ", resultentUser);
      if (resultentUser.length === 0) {
        alert("wrong credentials");

  } else {
        alert("Login Successfully");
        localStorage.setItem("CustomerEmail",resultentUser[0].email);
        gotoshop();
        
       
      }
    });
  };
  return (
    <div>
      <div className="loginContainer">
        <form className="cssToLoginForm">
          <h1>Welcome to Amora</h1>
          <h5>Choose your passion , your way...</h5>
          <hr />
          <h1 className="cssToLoginHeading">Login</h1>

          <div className="cssToLabel">
            <label>Email id</label>
          </div>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="abc12@gmail.com"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          <div className="cssToLabel">
            <label>Password</label>
          </div>
          <input
            type="text"
            name="password"
            onChange={handleChange}
            placeholder="Test@g123"
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};
