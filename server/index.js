const express = require("express");
const https = require("https");
const querystring = require("querystring");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.post("/getData", (req, res) => {
  const searchString = req.body.searchString;
  const api_key = process.env.API_KEY;
  const url = "https://www.whoisxmlapi.com/whoisserver/WhoisService";

  const parameters = {
    domainName: searchString,
    apiKey: api_key,
    outputFormat: "json",
  };

  const requestUrl = url + "?" + querystring.stringify(parameters);

  https
    .get(requestUrl, function (response) {
      const statusCode = response.statusCode;

      if (statusCode !== 200) {
        console.log("Request failed: " + statusCode);
        res.sendStatus(statusCode);
      }

      let rawData = "";

      response.on("data", function (chunk) {
        rawData += chunk;
      });

      response.on("end", function () {
        const parsedData = JSON.parse(rawData);
        res.json(parsedData);

        try {
          console.log("parsedData", parsedData);
        } catch (e) {
          console.log(e.message);
        }
      });
    })
    .on("error", function (e) {
      console.log("Error: " + e.message);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
