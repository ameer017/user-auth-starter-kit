import React, { useEffect, useState } from "react";
import "./Auth.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, RESET } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !emailAddress || !password) {
      return toast.error("Please, fill all fields");
    }

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = { fullName, emailAddress, password };

    await dispatch(register(userData));
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
        <h2>Create an Account</h2>

        <div className="to-flex">
          <div className="form-group --48 ">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group --48 ">
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
        </div>

        <div className="to-flex">
          <div className="form-group --48">
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
          <div className="form-group --48">
            <label htmlFor="password"> Confirm Password</label>
            <input
              type="password"
              id="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>
        </div>

        <button type="submit" className="register-btn">
          Register
        </button>

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
            Already a user?{" "}
            <Link
              to="/sign-in"
              style={{
                textDecoration: "underline",
              }}
            >
              SIgn In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
