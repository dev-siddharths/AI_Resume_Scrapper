import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect } from "react";
const Limitations = () => {
  const [cachedData, setcachedData] = React.useState("");
  const [loading, setLoading] = React.useState(false);
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
  const job_desc = localStorage.getItem("job_desc");
  function spinnerLoading() {
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
  useEffect(() => {
    const limitations = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "openai/gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `This is my resume data which basically consists of my skills:${skills}, education:${education}, certifications:${certifications}, projects:${projects}. Please tell me the limitations in my resume to the job description. The job description is: ${job_desc}.`,
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
        console.log(response.data.choices[0].message.content || "N/A");

        setcachedData(response.data.choices[0].message.content || "N/A");
        console.log("Coming from Api call " + response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    limitations();
  }, []);

  return (
    <div>
      <div className="container">
        <Navbar />
        <h3 className="text-center my-5">Limitations & Improvements</h3>

        <div className="card shadow-lg p-4 mb-4 rounded-4 border-primary">
          <div className="card-body" style={{ whiteSpace: "pre-wrap" }}>
            {cachedData}
            {spinnerLoading()}
          </div>
        </div>

        <br />
      </div>
    </div>
  );
};

export default Limitations;
