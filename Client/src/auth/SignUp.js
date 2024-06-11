import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth_form.css";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchSignupData = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/signup";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        mode: "cors",

        body: JSON.stringify({
          username: e.target.elements.username.value,
          email: e.target.elements.email.value,
          password: e.target.elements.password.value,
        }),
      });

      if (response.status === 401) {
        throw new Error("Email is available. Please chose another one");
      }

      if (response.status !== 201) {
        throw new Error("Something went wrong with server");
      }
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup">
      <p className="error_signup">{error}</p>
      <form className="form-control" onSubmit={fetchSignupData}>
        <h1>Sign Up</h1>
        <div>
          <div className="form_name">
            <input
              name="username"
              type="text"
              placeholder="Username"
              required
            />
          </div>

          <div className="form_email">
            <input name="email" type="email" placeholder="Email" required />
          </div>

          <div className="form_password">
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
