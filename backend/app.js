require("dotenv").config({ path: require("path").resolve(__dirname, ".env") });
const express = require("express");
const iaRoutes = require("./routes/ia-router");
const app = express();

app.use(express.json());

app.use("/api/ia", iaRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});