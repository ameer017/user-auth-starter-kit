import React, { useEffect, useState } from "react";
import "./Auth.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, RESET } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { isLoggedIn, isSuccess, isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { emailAddress, password } = formData;

    if (!emailAddress || !password) {
      return toast.error("Please, fill all fields");
    }

    const userData = { emailAddress, password };

    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile-page");
    }
    dispatch(RESET);
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Login Account</h2>

        <div className="form-group ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="register-btn">
        {isLoading ? "Signing in...": "Sign In"}
        </button>

        <p
          style={{
            margin: "5px 0px",
            textAlign: "right",
            textDecoration: "underline",
          }}
        >
          <Link to="/forgot-password">Forgot Password</Link>
        </p>
        <div className="--flex-between">
          <Link
            to="/"
            style={{
              textDecoration: "underline",
            }}
          >
            - Home -
          </Link>

          <p>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "underline",
              }}
            >
              SIgn Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
