import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use((req, res, next) => {
  if (path.extname(req.url).toLowerCase() === ".mkv") {
    const filePath = path.join(__dirname, req.url);
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).send("File not found");
      }
    });
  } else {
    next();
  }
});

let page = `
<html>
<head>
  <title>Unacceptable!</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:type" content="video.movie">
  <meta property="og:url" content="https://unacceptable.djstomp.repl.co/">
  <meta property="og:title" content="Unacceptable!">
  <meta property="og:description" content="Unacceptable!">
  <meta property="og:image" content="https://i.imgur.com/aEbcP3k.png">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://unacceptable.djstomp.repl.co/">
  <meta property="twitter:title" content="Unacceptable!">
  <meta property="twitter:description" content="Unacceptable!">
  <meta property="twitter:image" content="https://i.imgur.com/aEbcP3k.png">
  <link rel="icon" type="image/png" href="https://i.imgur.com/aEbcP3k.png">
   <style>
    body {
      margin: 0;
      padding: 0;
    }
    .video-container {
      position: relative;
      padding-bottom: 56.25%; /* Aspect Ratio 16:9 */
      height: 0;
      overflow: hidden;
    }
    .video-container video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
</head>
<body>
<div class="video-container">

  <video controls>
    <source src="lemongrab.mkv" type="video/mp4">
    Sorry! Your browser does not support this video.
  </video>
</div>

</body>
</html>
`;

app.get("/", (req, res) => {
  res.send(page);
});

app.listen(3000, () => {
  console.log("Beep boop server started!");
});
