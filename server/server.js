const express = require("express");
const app = express();
const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`App Server: Currently listening on Port ${PORT}!`);
});