const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connectMongodb = require("./init/mongodb")
const taskRoute = require("./routes/task")
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8000;

dotenv.config();

const app = express();

connectMongodb();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",taskRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
