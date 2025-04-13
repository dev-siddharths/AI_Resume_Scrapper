import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';


const DownloadPdf = () => {
  const location = useLocation();
  const data = location.state;
  const pdfRef = useRef(null);
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const dob = data.dob;
  const address = data.address;
  const website = data.website;
  const objective = data.objective;
  const skills = data.skills;
  const education = data.education;
  const institution_college = data.institution_college;
  const experience = data.experience;
  const projects = data.projects;
  const certifications = data.certifications;
  
  useEffect(() => {
    const element = pdfRef.current;

    const opt = {
      
      filename:     `${data.ogfilename}_structured.pdf`,
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 8 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  })
  console.log("Location state:", location.state);
  return (
    <div className="container my-2" ref={pdfRef} style={{fontSize:'1rem',color:"black",fontWeight:"500",fontFamily:"Georgia"}}>
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
  
}

export default DownloadPdf