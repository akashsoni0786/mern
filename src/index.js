const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const jwt = require("jsonwebtoken");
const app = express();
const url = `mongodb+srv://akash-mongo-connect:akash-mongo-connect@crud-oprn.a34mk4f.mongodb.net/?retryWrites=true&w=majority&appName=crud-oprn`;
mongoose.connect(url).then((conn) => {
  console.log("Connection stablished");
});

app.use(express.json()); // to read data from request body

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use((err, res) => {
  const statusValue = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusValue).json({
    status: statusValue,
    message: message,
    success: false,
  });
});
// Login Signup Logout--------------------------------------------
const payload = { user: "Akash Soni" };
app.use("/signup", (req, res) => {
  try {
    jwt.sign(
      { data: payload },
      "7yh908sd7fshf9s8d7fs9dfh984hsg",
      { algorithm: "HS512" },
      (err, data) => {
        if (err) {
          throw new Error(err.message);
        }

        res.cookie("token", data, {
          maxAge: 30 * 60 * 1000,
          httpOnly: true,
        });

        res.status(200).json({
          authToken: data,
        });
      }
    );
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
      success: false,
    });
  }
});
app.get("/verify", (req, res) => {
  try {
    const { token } = req.cookies;
    console.log("token ", token);

    const decoedToken = jwt.verify(token, "7yh908sd7fshf9s8d7fs9dfh984hsg");

    res.status(200).json({
      message: "token is decoded",
      decoedToken,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
});
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "user logged out successfully",
  });
});
app.listen(3000, () => {
  console.log("Working...", "http://localhost:3000");
});
