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
  // console.log("req", req.body.searchString);
  // console.log("api key", process.env.API_KEY);

  // const getWhoisData = (path, data) => {
  const url = "https://www.whoisxmlapi.com/whoisserver/WhoisService";
  // const baseData = {
  //   apiKey: api_key,
  //   outputFormat: "json",
  // };
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
          // console.log("rawData", rawData);

          console.log("parsedData", parsedData);
          // if (parsedData.WhoisRecord) {
          //   console.log("Domain name: " + parsedData.WhoisRecord.domainName);

          //   console.log(
          //     "Contact email: " + parsedData.WhoisRecord.contactEmail
          //   );
          // } else {
          //   console.log(parsedData);
          // }
        } catch (e) {
          console.log(e.message);
        }
      });
    })
    .on("error", function (e) {
      console.log("Error: " + e.message);
    });
  // let body = "";
  // const post_options = {
  //   host: "www.whoisxmlapi.com",
  //   path: url + path,
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  // };
  // https
  //   .request(post_options, function (response) {
  //     console.log("STATUS: " + response.statusCode);
  //     response.on("data", function (chunk) {
  //       body += chunk;
  //     });
  //     response.on("end", function () {
  //       res.json(body);
  //       console.log("body", body);
  //     });
  //   })
  //   .end(JSON.stringify(Object.assign({}, baseData, data)));
  // };

  // getWhoisData();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
