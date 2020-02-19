const express = require("express");
const app = express();

const axios = require("axios");
const redis = require("redis");

const PORT = process.env.PORT || 8080;
const CRICKET_API_TOKEN = process.env.CRICKET_API_TOKEN;
const MATCH_KEY = process.env.MATCH_KEY;
const REDIS_PORT = process.env.REDIS_PORT;

const client = redis.createClient(REDIS_PORT);

app.get("/", (req, res, next) => res.send(200));

app.get("/api/score", async (req, res, next) => {
  try {
    const {
      data: { data }
    } = await axios.get(
      `https://rest.cricketapi.com/rest/v2/match/${MATCH_KEY}/?access_token=${CRICKET_API_TOKEN}`
    );

    return res.status(200).json({
      success: true,
      message: "successful",
      data
    });
  } catch (error) {
    return error;
  }
});

app.listen(PORT, () => console.log(`catch server at: ${PORT}`));

module.exports = {
  client
};
