import "./RegisterComponent.css";

export const RegisterComponent = () => {
  return (
    <div className="register-wrapper">
      <div className="register">
        <h1>Save time, save money.</h1>
        <p>Sign up and we'll send the best deals to you</p>

        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Your Email"
          />

          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};
