//server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const campaigns = require("./routes/routes");
const cors = require('cors')

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(cors())

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

// Use Routes
app.use("/api/campaigns", campaigns);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
