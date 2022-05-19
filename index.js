const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const authRouter = require("./authRouter");
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://nastyagavrilova:arow325523@cluster0.8rwaw.mongodb.net/auth_roles?retryWrites=true&w=majority`
    );
    app.listen(port, () => {
      console.log(`server started on port: ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
