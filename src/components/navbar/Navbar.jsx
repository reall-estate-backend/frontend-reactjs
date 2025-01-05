import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAuthUser, setAuthHeader,setAuthUser } from "../../helpers/apiService"; 

function Navbar() {
  const navigate = useNavigate();
  const user = getAuthUser(); 

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setAuthHeader(null);
    setAuthUser(null);
    navigate("/login");
  };

  return (
    <nav>
      {user ? ( 
        <>
          <div className="left">
            <a href="/" className="logo">
              <img src="/logo.png" alt="" />
              <span style={{fontSize: "24px"}}>LamaEstate</span>
            </a>
            <a href="/" style={{fontSize: "19px"}}>Home</a>
            <a href="/Offres" style={{fontSize: "19px"}}>Offres</a>
            <a href="/Myspace" style={{fontSize: "19px"}}>My space</a>
            <a href="/Other" style={{fontSize: "19px"}}>FAQ</a>
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
              <div class="btn-wrap">
              <a href="/profile" class="btn-accent" style={{fontSize: "17px"}}>
                Profile
              </a>
            </div>
            <div class="btn-wrap">
              <a onClick={handleLogout}  class="btn-accent" style={{fontSize: "17px"}}>
                 Logout
              </a>
            </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="left">
            <a href="/" className="logo">
              <img src="/logo.png" alt="" />
              <span>LamaEstate</span>
            </a>
          </div>
          <div className="right">
            <div class="btn-wrap">
              <a href="/login" class="btn-accent" >
                Sign in
              </a>
            </div>
            <div class="btn-wrap">
              <a href="/register" class="btn-accent">
                Sign up
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
