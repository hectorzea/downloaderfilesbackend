const mongoose = require("mongoose");
require("dotenv").config({ path: "vars.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("error");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
