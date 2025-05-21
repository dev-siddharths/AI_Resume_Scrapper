import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PdfDisplay.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PdfDisplay = () => {
  const [match_per, setMatchPer] = React.useState("N/A");
  const [showModal, setShowModal] = React.useState(false);
  const [remail, setRemail] = React.useState("");
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
  const education = resumeData?.education?.slice(0, 2) || ["N/A", "N/A"];
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
        experience[i].dates?.endDate +
        "<br><br>";
    }
    return result;
  }

  function pdfBtn() {
    navigate("/downloadPdf");
  }
  function limitationsBtn() {
    navigate("/limitations");
  }
  function sendmailbtn() {
    if (!showModal) return null;
    return (
      <>
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Enter your Email:</p>
                <input
                  type="email"
                  className="form-control"
                  name="remail"
                  id="remail"
                  onChange={(e) => {
                    setRemail(e.target.value);
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/mail", {
                      state: {
                        remail: remail,
                      },
                    });
                    // Send the email using the email address entered in the modal
                    setShowModal(false);
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
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

  const job_desc = localStorage.getItem("job_desc");

  useEffect(() => {
    const fetchMatchPer = async () => {
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "openai/gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `This is my resume data which basically consists of my skills:${skills}, education:${education}, certifications:${certifications}, projects:${projects}. Please tell me the percentage match of my resume to the job description. The job description is: ${job_desc}. Return your answer in numerical form, that is it should be a number not text. Just a number not even with a % sign just a number.`,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer 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`,
              "Content-Type": "application/json",
            },
          }
        );
        setMatchPer(response.data.choices[0].message.content || "N/A");
      } catch (error) {
        console.error("API request failed:", error);
      }
    };
    fetchMatchPer();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h3 className="text-center mt-5">Resume Details</h3>
      <button className="btn btn-success mb-4 me-2" onClick={pdfBtn}>
        Download PDF
      </button>
      <button className="btn btn-success mb-4 me-2" onClick={limitationsBtn}>
        Limitations
      </button>
      <button
        className="btn btn-success mb-4"
        onClick={() => setShowModal(true)}
      >
        Send Mail
      </button>
      {sendmailbtn()}
      <div className="card shadow-lg p-4 mb-4 rounded-4 border-primary">
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
              <p className="mb-2">
                <strong>LinkedIn/GitHub/LeetCode:</strong>
                <br />
                {websites.map((site, index) =>
                  site ? (
                    <a
                      key={index}
                      href={site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-block text-decoration-underline text-primary"
                    >
                      {site}
                    </a>
                  ) : null
                )}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Objective:</strong> {objective}
              </p>
              <p>
                <strong>Education:</strong> <br />
                <i>
                  <u>{education[1]?.degree}</u>
                </i>{" "}
                from <u>{education[1]?.college}</u>
                <br />
                <i>
                  <u>{education[0]?.degree}</u>
                </i>{" "}
                from <u>{education[0]?.college}</u>
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
                <strong>Projects:</strong>
                <br />
                {projects}
              </pre>
              <strong>Work Experience:</strong>
              <pre
                className="custom-pre"
                dangerouslySetInnerHTML={{ __html: exp() }}
              ></pre>
              <strong>Certifications:</strong>
              <pre
                className="custom-pre"
                dangerouslySetInnerHTML={{ __html: forCertifications() }}
              ></pre>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h4>Percentage Match to Job Description</h4>
          <p>Your resume matches the job description by {match_per}.</p>
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={match_per}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-bar bg-success"
              style={{ width: `${match_per}%` }}
            >
              {match_per}
            </div>{" "}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default PdfDisplay;
