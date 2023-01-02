import "./user.css";

const Register = () => {
  return (
    <form className="login-form">
      <h2 style={{ textAlign: "center" }}>Create Account</h2>
      <span className="form-sec">
        <label>Name: </label>
        <input />
      </span>
      <span className="form-sec">
        <label>Email: </label>
        <input />
      </span>
      <span className="form-sec">
        <label>Password: </label>
        <input />
      </span>
      <span className="form-sec">
        <label>Confirm Password: </label>
        <input />
      </span>
    </form>
  );
};

export default Register;
