import React from "react";
import "./Home.css";
import logos from "./img/logo.png";
import Login from "./Login.js";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* <header>
        <section>
          <span>
            <a href="emailto:support@websitename.com">
              Support@websitename.com
            </a>
          </span>
        </section>
        <section>
          <span>
            <a href="#">
              <i className="fa fa-facebook"></i>
            </a>
          </span>
          <span>
            <a href="#">
              <i className="fa fa-instagram"></i>
            </a>
          </span>
          <span>
            <a href="#">
              <i className="fa fa-youtube"></i>
            </a>
          </span>
          <span>
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>
          </span>
        </section>
      </header> */}

      <nav>
        <div className="topnav" id="myTopnav">
          <p href="#home" id="logo">
            {/* <img src={logos} alt="LOGO " />*/}
            <span style={{ fontSize: "40px" }}>💌</span>{" "}
            <b style={{ fontSize: "20px" }}>Vid Date.</b>
          </p>
          {/* <div className="dropdown">
            <button className="dropbtn animate">
              Pages
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="#">Page no1</a>
              <a href="#">Page no2</a>
              <a href="#">Page no3</a>
            </div>
          </div> */}
          {/* <a href="#" className="animate">
            Tab-2
          </a> */}
          <p href="#">
            <Link to="/explore" style={{ color: "white" }}>
              Explore
            </Link>
          </p>
          <p id="active" className="animate">
            <Login />
          </p>{" "}
          <p href="#contact" className="animate">
            {" "}
            <ConnectButton />
          </p>
          <p className="icon">&#9776;</p>
        </div>
        <div id="navbar">
          <p href="#home" id="logo2">
            <img src={logos} alt="" /> <b>Logo.</b>
          </p>
          <a href="#about" className="animate">
            About
          </a>
          <a href="#contact" className="animate">
            Contact
          </a>
          <div className="dropdown">
            <button className="dropbtn animate">
              Pages
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="#">Page no1</a>
              <a href="#">Page no2</a>
              <a href="#">Page no3</a>
            </div>
          </div>
          <a href="#" className="animate">
            Tab-2
          </a>
          <a href="#" id="active2" className="animate">
            Home
          </a>
        </div>
      </nav>

      <main>
        <section>
          <h1 className="heading">Video Dating 📹 </h1>
          <h4 className="title">Let's date virtually with video profile 👩🏻‍❤️‍👨🏻!</h4>
          {/* <a href="#" className="btn1">
            Create Profile
          </a> */}
          <br />
          <br />
          <br />
          <Link to="/createProfile" className="btn1">
            {" "}
            Create Profile
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Home;
