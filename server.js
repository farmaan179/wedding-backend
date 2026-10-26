require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const app = express();
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api/guests", require("./routes/guestRoutes"));
app.use("/api/wedding", require("./routes/weddingRoutes"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));