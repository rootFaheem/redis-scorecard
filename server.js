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

const cachedScoreMiddleware = (_, res, next) => {
  try {
    client.get("score", (err, data) => {
      if (data) {
        return res.status(200).json({
          success: true,
          message: "Successful",
          score: JSON.parse(data)
        });
      } else {
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

app.get("/api/score", cachedScoreMiddleware, async (req, res, next) => {
  try {
    console.log("fetching...");

    const {
      data: { data }
    } = await axios.get(
      `https://rest.cricketapi.com/rest/v2/match/${MATCH_KEY}/?access_token=${CRICKET_API_TOKEN}`
    );

    client.setex("score", 10, JSON.stringify(data));

    return res.status(200).json({
      success: true,
      message: "successful",
      score: data
    });
  } catch (error) {
    return error;
  }
});

app.listen(PORT, () => console.log(`catch server at: ${PORT}`));
