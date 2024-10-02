import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="text-content">
          <h1>Secure, Scalable Authentication Made Easy</h1>
          <p>
            Simplify user management with our powerful authentication starter
            kit. Build seamless login, registration, and password recovery flows
            in minutes — fully customizable and secure.
          </p>
          <p>
            Get started today and take control of your app&apos;s
            authentication.
          </p>
          <Link to="/register" className="get-started-btn">
            Get Started
          </Link>
        </div>

        <div className="image-content">
          <img
            src="https://cdn.dribbble.com/users/279014/screenshots/5722905/dribbble_1.gif"
            alt="hero"
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
