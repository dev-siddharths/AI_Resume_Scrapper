import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary p-3 shadow-lg"
        style={{ borderRadius: "1rem" }}
      >
        <a className="navabar" href="/homepage">
          Resume Scrapper
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className=" justify-content-end collapse navbar-collapse"
          id="navbarNav"
        >
          <h4 style={{ margin: "0px", padding: "0px", fontFamily: "poppins" }}>
            <i>Scan Resumes. Find Talent. Fast.</i>
          </h4>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
