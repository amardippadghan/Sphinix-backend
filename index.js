const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const apiRouter = express.Router();

const UserRoutes = require("./routes/UserRoutes");

apiRouter.use("/auth", UserRoutes);

app.use("/api", apiRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
