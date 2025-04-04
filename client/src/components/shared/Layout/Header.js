import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  //logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Are you sure?");
    toast.success("Logout Successfull");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="container-fluid d-flex align-items-center">
        <div className="navbar-brand d-flex align-items-center">
          <BiDonateBlood color="red" size={24} className="me-2" />
          Blood Bank App
        </div>
        <ul className="navbar-nav flex-row ms-auto align-items-center">
          <li className="nav-item mx-3">
            <p className="nav-link mb-0 d-flex align-items-center">
              <BiUserCircle color="blue" size={24} className="me-1" />
              {loading
                ? "Loading..."
                : `Welcome ${
                    user?.name || user?.hospitalName || user?.organizationName
                  }`}{" "}
              &nbsp;
              <span className="badge bg-secondary">{user?.role}</span>
            </p>
          </li>
          {location.pathname === "/" ||
          location.pathname === "/donar" ||
          location.pathname === "/hospital" ? (
            <li className="nav-item mx-3">
              <Link to="/analytics" className="nav-link">
                Analytics
              </Link>
            </li>
          ) : (
            <li className="nav-item mx-3">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          )}
          <li className="nav-item mx-3">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
