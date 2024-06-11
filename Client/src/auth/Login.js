import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/login-slice";
import "./Auth_form.css";

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchLoginData = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        mode: "cors",

        body: JSON.stringify({
          email: e.target.elements.email.value,
          password: e.target.elements.password.value,
        }),
      });

      if (response.status === 401) {
        throw new Error("Email or Password is incorrect!");
      }
      if (response.status !== 200) {
        throw new Error("Something went wrong with server!");
      }
      const data = await response.json();

      localStorage.setItem(
        "loginUser",
        JSON.stringify({
          isLogin: true,
          username: data.username,
          email: data.email,
          password: data.password,
        })
      );
      dispatch(
        loginActions.ON_LOGIN(JSON.parse(localStorage.getItem("loginUser")))
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <p className="error_signup">{error}</p>
      <form className="form-control" onSubmit={fetchLoginData}>
        <h1>Login</h1>
        <div>
          <div className="form_email">
            <input id="email" type="email" placeholder="Email" required />
          </div>

          <div className="form_password">
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
