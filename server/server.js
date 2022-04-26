// server/index.js

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const router = express.Router({ mergeParams: true });
const path = require('path');

const app = express();



// All other GET requests not handled before will return our React app
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

/*
router.get("/", async function (req, res) {
  //res.sendFile(path.join(__dirname, Path, "/index.js"));
  res.json({ message: "Hello from server!" });
  console.log("Hello from Express")
});*/

// Handle GET requests to /api route
router.get("/api", async function(req, res)  {
  res.json({ message: "Hello from server!" });
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//add the router
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});