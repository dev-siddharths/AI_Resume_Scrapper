import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import html2pdf, { f } from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Mail = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const remail = location.state?.remail || "N/A";
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

  function spinnerLoading() {
    if (loading) {
      return (
        <>
          <h1 style={{ textAlign: "center" }}>Mail is being sent...........</h1>
          <div
            className="spinner-grow"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </>
      );
    }
  }

  useEffect(() => {
    async function sendEmail() {
      const element = pdfRef.current;
      const opt = {
        filename: `Resume_structured.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 4 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      const pdfBlob = await html2pdf().from(element).set(opt).outputPdf("blob");

      const formData = new FormData();
      formData.append("pdf", pdfBlob, "resume.pdf"); // name, file, filename
      formData.append("to", remail); // replace with dynamic email if needed

      try {
        setLoading(true);
        const response = await axios.post(
          "https://ai-resume-scrapper.onrender.com/mail",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.status === 200) {
          alert("Email sent successfully!");
          navigate("/pdfFile");
        }
      } catch (error) {
        console.error("Error sending email:", error);
      } finally {
        setLoading(false);
      }
    }
    sendEmail();
  }, []);

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
      {spinnerLoading()}
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
                  <u>{education[1]?.degree}</u>
                </i>{" "}
                from <u>{education[1]?.college}</u> <br />
                <strong> Masters's Degree:</strong>{" "}
                <i>
                  <u>{education[0]?.degree}</u>
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
                ></pre>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mail;
