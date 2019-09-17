const mongoose = require("mongoose");
const express = require("express");
const app = express();
const photo = require("./routes/photo");
const category = require("./routes/category");

// MongoDB connection
mongoose
  .connect("mongodb://localhost/gallery", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connecting to mongoDB"))
  .catch(error => console.error("Could not connect to mongoDB ", error));

app.use(express.json());
app.use("/api/photo", photo);
app.use("/api/category", category);
app.use(express.static("public"));
// Port Configuration
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listen on port ", port));
