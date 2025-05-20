const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log("Server Started");
});

const memory = multer.memoryStorage();
const upload = multer({ storage: memory }).single("resume");
const apiKey = process.env.AFFINDA_API_KEY;
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
            Authorization: `Bearer aff_fa6ce0ac32ed5b7f22b77019abb6617f1c3dcdb8`,
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
