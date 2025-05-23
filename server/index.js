const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const FormData = require("form-data");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log("Server Started");
});

const memory = multer.memoryStorage();
const upload = multer({ storage: memory }).single("resume");
const apiKey = process.env.API_KEY;
//console.log(apiKey);
app.post("/", upload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    if (req.file) {
      const fileBuffer = req.file.buffer;
      const formData = new FormData();
      formData.append("file", fileBuffer, {
        filename: req.file.originalname,
        contentType: "application/pdf",
      });
      const affinda = await axios.post(
        "https://api.affinda.com/v2/resumes",
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            ...formData.getHeaders(),
          },
        }
      );
      res.json({ data: affinda.data, filename: req.file.originalname });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error in processing" });
  }
});

const memory2 = multer.memoryStorage();
const upload2 = multer({ storage: memory2 }).single("pdf");
const emailKey = process.env.Gmail_Key;
app.post("/mail", upload2, async (req, res) => {
  const to = req.body.to;
  const pdfBuffer = req.file.buffer;
  // Configure your email settings
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "siddharthsurve29@gmail.com",
      pass: `${emailKey}`, // Use Gmail App Password, not your real password
    },
  });

  // 📎 Define the email options
  const mailOptions = {
    from: "siddharthsurve29@gmail.com",
    to: to,
    subject: "From AI Resume Scrapper",
    text: "Email with PDF attachment of structured resume",
    html: `<h1>Here is your PDF!</h1><p>Attached is the PDF you requested.</p>`,
    attachments: [
      {
        filename: req.file.originalname,
        content: pdfBuffer,
        contentType: req.file.mimetype,
      },
    ],
  };

  // 📤 Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent with PDF!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
});
