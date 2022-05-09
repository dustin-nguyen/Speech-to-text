// server/index.js

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const router = express.Router({ mergeParams: true });
const path = require("path");
const { ppid } = require("process");

const app = express();

const cors = require('cors');

app.use(cors({
  origin: '*'
}));

// Have Node serve the files for our built React app
//https://stackoverflow.com/questions/34105183/uncaught-syntaxerror-unexpected-token-in-node-js
app.use(express.static(path.resolve(__dirname, "../client/build")));
// app.use(express.static('public'))
// app.use(express.static('build'))



/*
router.get("/", async function (req, res) {
  //res.sendFile(path.join(__dirname, Path, "/index.js"));
  res.json({ message: "Hello from server!" });
  console.log("Hello from Express")
});*/

// Handle GET requests to /api route
app.get("/api", async function (req, res) {
  // console.log("Hello from Express")
   res.json({ message: "Hello from server!" });
 });

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  // let url = path.join(__dirname, "../client/build", "index.html");
  // if (!url.startsWith("/app/"))
  //   // we're on local windows
  //   url = url.substring(1);
  // res.render(url);
  //res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  //res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  console.log("Hello from Express")
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});



//add the router
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
