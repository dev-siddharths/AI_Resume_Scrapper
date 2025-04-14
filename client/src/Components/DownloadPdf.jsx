import React, { useEffect } from "react";

import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";

const DownloadPdf = () => {
  const navigate = useNavigate();
  const pdfRef = useRef(null);
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

  useEffect(() => {
    const element = pdfRef.current;

    const opt = {
      filename: `${fileName}_structured.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
    navigate("/Homepage");
  });
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
  return (
    <div
      className="container my-2"
      ref={pdfRef}
      style={{
        fontSize: "0.8rem",
        color: "black",
        fontWeight: "500",
        fontFamily: "Georgia",
      }}
    >
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
                <strong> Bachelor's Degree:</strong>{" "}
                <i>
                  <u>{education[1].degree}</u>
                </i>{" "}
                from <u>{education[1].college}</u> <br />
                <strong> Masters's Degree:</strong>{" "}
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
                <pre className="custom-pre">{experience}</pre>
              </p>
              <p>
                <strong>Certifications:</strong>
                <pre className="custom-pre">{certifications}</pre>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPdf;
