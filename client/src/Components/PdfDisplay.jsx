import React from "react";
import { useLocation } from "react-router-dom";

const PdfDisplay = () => {
  const location = useLocation();
  const data = location.state;

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
  // Extract Work Experience
  const workExpSection = data.data.sections?.find(
    (sec) => sec.sectionType === "WorkExperience"
  );
  const experience = workExpSection?.text || "Not Defined";

  // Extract Projects
  const projectsSection = data.data.sections?.find(
    (sec) => sec.sectionType === "Projects"
  );
  const projects = projectsSection?.text || "Not Defined";

  // Extract Certifications
  const certSection = data.data.sections?.find(
    (sec) => sec.sectionType === "Certifications"
  );
  const certifications = certSection?.text || "Not Defined";

  // Extract LinkedIn and GitHub (if they exist) from sections[0].text
  const rawText = data.data.sections?.[0]?.text || "";
  const linkedInMatch = rawText.match(
    /https?:\/\/(www\.)?linkedin\.com\/[^\s)]+/i
  );
  const githubMatch = rawText.match(/https?:\/\/(www\.)?github\.com\/[^\s)]+/i);

  const linkedIn = linkedInMatch ? linkedInMatch[0] : "Not Found";
  const github = githubMatch ? githubMatch[0] : "Not Found";

  return (
    <>
      <h3>Resume Details</h3>
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
        <strong>Website:</strong> {website}
      </p>
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
      <p>
        <pre>
          <strong>Projects:</strong>
          <br />
          {projects}
        </pre>
      </p>
      <p>
        <pre>
          <strong>Work Experience:</strong>
          <br />
          {experience}
        </pre>
      </p>
      <p>
        <strong>Certifications:</strong>
        <br />
        {certifications}
      </p>
      <p>
        <strong>LinkedIn:</strong> {linkedIn}
      </p>
      <p>
        <strong>GitHub:</strong> {github}
      </p>
    </>
  );
};

export default PdfDisplay;
