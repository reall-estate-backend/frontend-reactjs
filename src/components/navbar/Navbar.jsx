import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {

  const user = true;
  
  return (
      <nav>
        {user? (
            <>
              <div className="left">
                <a href="/" className="logo">
                  <img src="/logo.png" alt=""/>
                  <span>LamaEstate</span>
                </a>
                <a href="/HomePage">Home</a>
                <a href="/Offres">Offres</a>
                <a href="/Myspace">My space</a>
                <a href="/Other">Other</a>
              </div>
              <div className="right">
                <div className="user">
              <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                >
                  <path d="..."></path>
                </svg>
              </span>
                  <Link to="/profile" className="profile">
                    <span>My Profile</span>
                  </Link>
                </div>
              </div>
            </>
        ) : (
            <>
                <div className="left">
                    <a href="/" className="logo">
                        <img src="/logo.png" alt=""/>
                        <span>LamaEstate</span>
                    </a>
                </div>

            </>
        )}
      </nav>
  );
}

export default Navbar;
