const cors = require("cors");

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = cors(corsOptions);
