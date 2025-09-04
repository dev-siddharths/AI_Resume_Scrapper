📄 AI Resume Scrapper

An intelligent Resume Parsing and Analysis Tool built with the MERN stack. This project extracts structured data (Name, Email, Skills, Education, DOB, etc.) from resumes using the Affinda API, analyzes them against a given job description, and provides insights like missing skills, improvement suggestions, and even allows downloading results.

🚀 Features

📂 Upload resumes in PDF/DOCX format

🔍 Extract structured data (Name, Email, Skills, Education, DOB, etc.)

🤖 AI-powered analysis using Affinda API

✉️ Job description matching with gap identification

📬 Email sending feature

💾 Local storage support for saving parsed resumes

⬇️ Download results locally as PDF/JSON

🎨 Clean React frontend


🖼️ Screenshots

Resume Upload Page

<img width="1346" height="600" alt="image" src="https://github.com/user-attachments/assets/63e52606-9134-4866-8a62-05e2a1c701db" />

Extracted Resume Data

![AI_Resume_ExtractionPage_OG](https://github.com/user-attachments/assets/b8b3dea6-116a-4d43-987e-68c213a8d892)


<img width="1199" height="579" alt="Screenshot 2025-09-04 200746" src="https://github.com/user-attachments/assets/b77596b4-0a81-471f-8049-50c530697388" />

Limitations Report / Analysis Report

<img width="1206" height="560" alt="AI_Resume_Project2" src="https://github.com/user-attachments/assets/80781be7-55bd-4e67-9081-a9c80528920f" />

🛠️ Tech Stack

FRONTEND: React, BootStrap
BACKEND: Node.js, Express.js
DATABASE: LocalStorage
API: Affinda Resume Parsing API

⚙️ Installation

Clone the repo

git clone https://github.com/dev-siddharths/AI_Resume_Scrapper.git
cd AI_Resume_Scrapper


Backend setup

cd server
npm install
npx nodemon index.js


Frontend setup

cd client
npm install
npm run dev


Environment Variables
Create a .env file in the server folder and add:
AFFINDA_API_KEY=your_api_key_here


📊 Project Workflow

Upload Resume
Parse using Affinda API
Extract key information
Match against job description
Show missing skills & improvement areas
Allow email + download

📌 Roadmap / Future Enhancements

🔐 Add authentication (Clerk/Auth0)
🗄️ Migrate storage to MongoDB/SQL
📊 Dashboard for recruiters
🧠 AI-based ranking system for resumes

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

📜 License

This project is licensed under the MIT License.

