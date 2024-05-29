// src/server.js
require("dotenv").config({ path: "../.env" });

const app = require("./app");
const PORT = process.env.PORT || 3001;

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
