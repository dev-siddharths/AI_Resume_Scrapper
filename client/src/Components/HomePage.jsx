import React, { useState } from "react";
import "./HomePage.css";
import skillsimg from "../assets/images/skills.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import PdfDisplay from "./PdfDisplay";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  function handleFile(e) {
    setFile(e.target.files[0]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await axios.post("http://localhost:3001", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/pdfFile", { state: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <title>HomePage</title>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* navbar */}
            <Navbar />
          </div>
          <div className="col-md-12 mt-5 p-3 d-flex flex-column justify-content-center align-items-center">
            <div className="text-center bg-light p-5">
              <h1 className="display-4">Welcome to AI Resume Scrapper</h1>
              <p className="lead">
                Automate your resume filtering process with AI.
              </p>
              <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf" onChange={handleFile} />
                <input
                  type="submit"
                  value="Upload Resume"
                  className="btn btn-dark btn-lg"
                />
              </form>
            </div>
          </div>

          <div className="col-md-12">
            <h3 className="text-center mb-4">Features</h3>
            <div className="row">
              {/* Feature 1 */}
              <div className="col-md-6 mb-4">
                <div className="d-flex align-items-center p-3 shadow-sm rounded bg-white">
                  <img
                    src={skillsimg}
                    alt="icon"
                    style={{ width: "50px", height: "50px" }}
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">Extract Skills & More</h5>
                    <small>Description</small>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="col-md-6 mb-4">
                <div className="d-flex align-items-center p-3 shadow-sm rounded bg-white">
                  <img
                    src={skillsimg}
                    alt="icon"
                    style={{ width: "50px", height: "50px" }}
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">Supports PDF/DOCX</h5>
                    <small>Description</small>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="col-md-6 mb-4">
                <div className="d-flex align-items-center p-3 shadow-sm rounded bg-white">
                  <img
                    src={skillsimg}
                    alt="icon"
                    style={{ width: "50px", height: "50px" }}
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">Fast and Accurate</h5>
                    <small>Description</small>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="col-md-6 mb-4">
                <div className="d-flex align-items-center p-3 shadow-sm rounded bg-white">
                  <img
                    src={skillsimg}
                    alt="icon"
                    style={{ width: "50px", height: "50px" }}
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">Easy to Use</h5>
                    <small>Description</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3 mb-3">
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              How It Works
            </h3>
            {/* 1st */}
            <div className="row justify-content-between">
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center shadow-lg rounded bg-white p-4">
                <h3>1</h3>
                <h5>Upload your resume</h5>
              </div>
              {/* 2nd */}
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center shadow-lg rounded bg-white p-4">
                <h3>2</h3>
                <h5>We analyze it</h5>
              </div>
              {/* 3rd */}
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center shadow-lg rounded bg-white p-4">
                <h3>3</h3>
                <h5>Get structured output</h5>
              </div>
            </div>
          </div>
          <div
            className="col-md-12 shadow-lg rounded-1"
            style={{ backgroundColor: "#2c2c2c", color: "whitesmoke" }}
          >
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
