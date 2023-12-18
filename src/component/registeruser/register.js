import { useEffect, useState } from "react";
import "./register.css";
import axios from "axios";
import { Validation } from "./Validation";
import {useNavigate} from 'react-router-dom';
export const Register = () => {

  const navigate=useNavigate();

  const goToLogin=()=>{
    navigate('/login')
  }
  const [registerdata, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registerusers, setRegisterUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/register-user",
    }).then((response) => {
      setRegisterUsers(response.data);
    });
  }, []);

  const handleData = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerdata, [name]: value });
  };

  const handleRegister = () => {
    axios({
      method: "post",
      url: "http://localhost:4000/register-user",
      data: registerdata,
    }).then((Response) => {
      alert("save succesfully");
      goToLogin();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Validation(registerdata): ", Validation(registerdata));

    let errors = Validation(registerdata);
    let users = {};
    if (Object.keys(errors).length === 0) {
      users = registerusers.find((user) => {
        if (user.email === registerdata.email) {
          return users;
        }
      });

      if (!users) {
        handleRegister();

      }
      else{
        alert("User Already Exist");
      }
    }else{
      setErrors(Validation(registerdata));
    }
  };

  return (
    <div>
      <div className="registerContainer">
        <form className="cssToRegisterForm">
          <h1>Welcome to Amora</h1>
          <h5>Choose your passion , your way...</h5>
          <hr />
          <h1 className="cssToRegisterHeading">Register</h1>
          <div className="cssToLabel">
            <label>Name</label>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Firstname Lastname"
            onChange={handleData}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

          <div className="cssToLabel">
            <label>Email id</label>
          </div>
          <input
            type="text"
            name="email"
            placeholder="abc12@gmail.com"
            onChange={handleData}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          <div className="cssToLabel">
            <label>Password</label>
          </div>
          <input
            type="text"
            name="password"
            onChange={handleData}
            placeholder="Test@g123"
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <button onClick={handleSubmit}>Register</button>
        </form>
      </div>
    </div>
  );
};
