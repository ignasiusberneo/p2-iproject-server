require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes/index");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(route);

app.listen(port, () => {
  console.log(`LISTENING TO PORT ${port}`);
});
