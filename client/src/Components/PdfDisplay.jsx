import React from "react";
import { useLocation } from "react-router-dom";

const PdfDisplay = () => {
  const location = useLocation();
  const { pdfUrlblob } = location.state || {};

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Uploaded Resume</h2>
      {pdfUrlblob ? (
        <iframe src={pdfUrlblob} width="100%" height="600px" />
      ) : (
        <p>No PDF to display</p>
      )}
    </div>
  );
};

export default PdfDisplay;
