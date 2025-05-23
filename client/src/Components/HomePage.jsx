import React, { useState } from "react";
import "./HomePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import PdfDisplay from "./PdfDisplay";
import skills_img from "../assets/images/skills_img.png";

import pdf_img from "../assets/images/pdf_img.png";
import fast_img from "../assets/images/fast_img.png";
import easytouse_img from "../assets/images/easytouse_img.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [job_desc, setJobdesc] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);
    try {
      const res = await axios.post("https://ai-resume-scrapper.onrender.com", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      const extracted = res.data.data.data;

      const name = extracted.name?.raw || "";
      const email = extracted.emails?.[0] || "N/A";
      const phone = extracted.phoneNumbers?.[0] || "N/A";
      const dob = extracted.dateOfBirth || "N/A";
      const address = extracted.location?.formatted || "N/A";
      const websites = extracted.websites || [];
      const objective = extracted.objective || "";
      const skills = extracted.skills?.map((skill) => skill.name) || [];

      const education =
        extracted.education?.map((edu) => ({
          degree: edu.accreditation?.education || "N/A",
          college: edu.organization || "N/A",
          completionDate: edu.dates?.completionDate || "N/A",
        })) || [];
      console.log(education);
      const certifications = extracted.certifications || [];

      const projectsSection =
        extracted.sections?.find(
          (section) => section.sectionType === "Projects"
        )?.text || "";

      const workExperience = extracted.workExperience || [];
      localStorage.setItem(
        "resumeData",
        JSON.stringify({
          name,
          email,
          phone,
          dob,
          address,
          websites,
          objective,
          skills,
          education,
          certifications,
          projectsSection,
          workExperience,
        })
      );
      localStorage.setItem("job_desc", job_desc);
      navigate("/pdfFile");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  function spinner() {
    if (loading) {
      return (
        <div
          className="spinner-grow"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }
  }

  return (
    <>
      <title>HomePage</title>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* navbar */}
            <Navbar />
          </div>
          <div className="col-md-12 mt-3 p-3 d-flex flex-column justify-content-center align-items-center">
            <div className="text-center bg-light p-5">
              <h1 className="display-4">Welcome to AI Resume Scrapper</h1>
              <p className="lead">
                Automate your resume filtering process with AI.
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  id="fileupload"
                  className="form-control"
                  accept=".pdf"
                  onChange={handleFile}
                />
                <br />
                <br />
                <h4>Enter the Job Description</h4>
                <textarea
                  style={{
                    displayb: "block",
                    width: "50%",
                    height: "50px",
                    marginTop: "1rem",
                  }}
                  name=""
                  id=""
                  onChange={(e) => {
                    setJobdesc(e.target.value);
                  }}
                ></textarea>
                <br />
                <br />
                <input
                  type="submit"
                  value="Upload Resume"
                  className="btn btn-dark btn-lg"
                />{" "}
                <br /> <br />
                {spinner()}
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
                    src={skills_img}
                    alt="icon"
                    style={{ width: "50px", height: "50px" }}
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">Extract Skills & More</h5>
                    <small>
                      Automatically identifies skills, education, experience,
                      and more from resumes.
                    </small>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="col-md-6 mb-4">
                <div className="d-flex align-items-center p-3 shadow-sm rounded bg-white">
                  <img
                    src={pdf_img}
                    alt="icon"
                    style={{ width: "50px", height: "50px" }}
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">Supports PDF</h5>
                    <small>Upload resumes in PDF format with ease</small>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="col-md-6 mb-4">
                <div className="d-flex align-items-center p-3 shadow-sm rounded bg-white">
                  <img
                    src={fast_img}
                    alt="icon"
                    style={{ width: "50px", height: "50px" }}
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">Fast and Accurate</h5>
                    <small>
                      Get quick results with high accuracy using AI-powered
                      parsing.
                    </small>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="col-md-6 mb-4">
                <div className="d-flex align-items-center p-3 shadow-sm rounded bg-white">
                  <img
                    src={easytouse_img}
                    alt="icon"
                    style={{ width: "50px", height: "50px" }}
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">Easy to Use</h5>
                    <small>
                      Simple interface that anyone can use without technical
                      knowledge
                    </small>
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
