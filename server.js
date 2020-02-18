const express = require("express");
const app = express();

const PORT = process.env.PORT;
const CRICKET_API_TOKEN = process.env.CRICKET_API_TOKEN;

app.listen(PORT, () => console.log(`catch server at: ${PORT}`));
