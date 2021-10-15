const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
connectDB();
const corsConfig = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(corsConfig));
const port = process.env.PORT || 4000;
app.use(express.json());

//hab carpeta publica
app.use(express.static("uploads"));

app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/enlaces", require("./routes/enlaces"));
app.use("/api/archivos", require("./routes/archivos"));

app.listen(port, "0.0.0.0", () => {
  console.log(`Server working on ${port}`);
});
