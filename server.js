import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.render.com/v1/services", {
      headers: {
        Authorization: `Bearer ${process.env.RENDER_API_KEY}`,
        Accept: "application/json",
      },
    });

    const prettyJson = JSON.stringify(response.data, null, 2);

    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Render JSON Services</title>
          <style>
            body {
              font-family: monospace;
              background: #f0f4f8;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 20px;
            }
            .json-box {
              background: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.2);
              max-width: 90%;
              max-height: 80vh;
              overflow: auto;
              white-space: pre;
            }
          </style>
        </head>
        <body>
          <div class="json-box">${prettyJson}</div>
        </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch services");
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
