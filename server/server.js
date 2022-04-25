// server/index.js

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const router = express.Router({ mergeParams: true });

const app = express();




router.get("/", async function (req, res) {
  //res.sendFile(path.join(__dirname, Path, "/index.js"));
  res.json({ message: "Hello from server!" });
  console.log("Hello from Express")
});

app.get("/api", async function(req, res)  {
  res.json({ message: "Hello from server!" });
});



//add the router
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});