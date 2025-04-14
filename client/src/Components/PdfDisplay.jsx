import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PdfDisplay.css"; // Import custom CSS file
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const PdfDisplay = () => {
  const navigate = useNavigate();
  const resumeData = JSON.parse(localStorage.getItem("resumeData"));
  const name = resumeData?.name || "N/A";
  const email = resumeData?.email || "N/A";
  const phone = resumeData?.phone || "N/A";
  const dob = resumeData?.dob || "N/A";
  const address = resumeData?.address || "N/A";
  const websites = resumeData?.websites || [];
  const objective = resumeData?.objective || "N/A";
  const skills = resumeData?.skills || [];

  const education = resumeData?.education?.slice(0, 2) || [];

  const projects = resumeData?.projectsSection || "N/A";
  const experience = resumeData?.workExperience || "N/A";
  const certifications = resumeData?.certifications || "N/A";
  const fileName = resumeData?.fileName || "N/A";

  function exp() {
    let result = "";
    for (let i = 0; i < experience.length; i++) {
      result +=
        "<b>JobTitle:</b> " +
        experience[i].jobTitle +
        "<br>" +
        "<b>Organization:</b> " +
        experience[i].organization +
        "<br>" +
        "<b>Start-Date: </b>" +
        experience[i].dates?.startDate +
        "<br><b>End-Date: </b>" +
        experience[i].dates?.endDate;
    }
    return result;
  }
  console.log(experience.length);

  function pdfBtn() {
    navigate("/downloadPdf");
  }
  function forskills() {
    let result = "";
    for (let i = 0; i < skills.length; i++) {
      if (i === skills.length - 1) {
        result += skills[i] + ".";
      } else {
        result += skills[i] + ", ";
      }
    }
    return result;
  }

  function forCertifications() {
    let result = "";
    for (let i = 0; i < certifications.length; i++) {
      result += certifications[i] + "<br>";
    }
    return result;
  }
  console.log(certifications);
  return (
    <div className="container">
      <Navbar />
      <h3 className="text-center m-4">Resume Details</h3>{" "}
      <button onClick={pdfBtn}>Download Pdf</button>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Phone:</strong> {phone}
              </p>
              <p>
                <strong>Date of Birth:</strong> {dob}
              </p>
              <p>
                <strong>Address:</strong> {address}
              </p>
              <p>
                <strong>Linkdln/Github/LeetCode</strong> <br />
                <a href={websites[0]} target="_blank">
                  {websites[0]}
                </a>
                <br />
                <a href={websites[1]} target="_blank">
                  {websites[1]}
                </a>
                <br />
                <a href={websites[2]} target="_blank">
                  {websites[2]}
                </a>
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Objective:</strong> {objective}
              </p>
              <p>
                <strong>Education:</strong> <br />
                <i>
                  <u>{education[1].degree}</u>
                </i>{" "}
                from <u>{education[1].college}</u> <br />
                <i>
                  <u>{education[0].degree}</u>
                </i>{" "}
                from
                <u> {education[0].college} </u>
              </p>

              <p>
                <strong>Skills:</strong>
                <br />
                {forskills()}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <pre className="custom-pre">
                <strong>
                  Projects: <br />
                </strong>
                {projects}
              </pre>

              <p>
                <strong>Work Experience:</strong>
                <pre
                  className="custom-pre"
                  dangerouslySetInnerHTML={{ __html: exp() }}
                ></pre>
              </p>
              <p>
                <strong>Certifications:</strong>
                <pre
                  className="custom-pre"
                  dangerouslySetInnerHTML={{ __html: forCertifications() }}
                >
                  {}
                </pre>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDisplay;
