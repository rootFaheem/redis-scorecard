const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
const CRICKET_API_TOKEN = process.env.CRICKET_API_TOKEN;
const MATCH_KEY = process.env.MATCH_KEY;

app.get("/", (req, res, next) => res.send(200));

const REQ_URL = `https://rest.cricketapi.com/rest/v2/match/${MATCH_KEY}/?access_token=${CRICKET_API_TOKEN}`;

app.listen(PORT, () => console.log(`catch server at: ${PORT}`));
