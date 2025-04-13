import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PdfDisplay.css"; // Import custom CSS file
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const PdfDisplay = () => {
  const location = useLocation();
  const data = location.state.data;
  const ogfilename = location.state.filename;
  const navigate = useNavigate();
  

  const name = `${data.data.name?.first || ""} ${data.data.name?.last || ""}`;
  const email = data.data.emails?.[0] || "Not Defined";
  const phone = data.data.phoneNumbers?.[0] || "Not Defined";
  const dob = data.data.dateOfBirth || "Not Defined";
  const address = data.data.location?.formatted || "Not Defined";
  const website = data.data.websites?.[0] || "Not Defined";
  const objective = data.data.objective || "Not Defined";
  const skills =
    data.data.skills?.map((skill) => skill.name).join(", ") || "Not Defined";
  const education =
    data.data.education?.[0]?.accreditation?.education || "Not Defined";

  const institution_college =
    data.data.education?.[0]?.organization || "Not Defined";
  const workExpSection = data.data.sections?.find(
    (sec) => sec.sectionType === "WorkExperience"
  );
  const experience = workExpSection?.text || "Not Defined";

  const projectsSection = data.data.sections?.find(
    (sec) => sec.sectionType === "Projects"
  );
  const projects = projectsSection?.text || "Not Defined";

  const certSection = data.data.sections?.find(
    (sec) => sec.sectionType === "Certifications"
  );
  const certifications = certSection?.text || "Not Defined";

  const rawText = data.data.sections?.[0]?.text || "";
  const linkedInMatch = rawText.match(
    /https?:\/\/(www\.)?linkedin\.com\/[^\s)]+/i
  );
  const githubMatch = rawText.match(/https?:\/\/(www\.)?github\.com\/[^\s)]+/i);

  const linkedIn = linkedInMatch ? linkedInMatch[0] : "Not Found";
  const github = githubMatch ? githubMatch[0] : "Not Found";

  function pdfBtn() {
    navigate("/downloadPdf", {
      state: {
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        address: address,
        website: website,
        objective: objective,
        skills: skills,
        education: education,
        institution_college: institution_college,
        projects: projects,
        experience: experience,
        certifications: certifications,
        linkedIn: linkedIn,
        github: github,
        ogfilename: ogfilename,
      },
    });
  }

  return (
    <div className="container ">
    <Navbar/>
      <h3 className="text-center m-4">Resume Details</h3> <button onClick={pdfBtn}>Download Pdf</button>
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
                <strong>Linkdln/Github</strong> {website}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Objective:</strong> {objective}
              </p>
              <p>
                <strong>Education:</strong> {education}
              </p>
              <p>
                <strong>Institution:</strong> {institution_college}
              </p>
              <p>
                <strong>Skills:</strong> {skills}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p>
                <strong>Projects:</strong>
                <pre className="custom-pre">{projects}</pre>
              </p>
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

export default PdfDisplay;