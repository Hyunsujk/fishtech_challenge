const express = require("express");
const https = require("https");
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
  console.log("req", req.body.searchString);
  console.log("api key", process.env.API_KEY);

  const getWhoisData = (path, data) => {
    const url = "/BulkWhoisLookup/bulkServices/";
    const baseData = {
      apiKey: api_key,
      outputFormat: "json",
    };
    let body = "";
    const post_options = {
      host: "www.whoisxmlapi.com",
      path: url + path,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    https
      .request(post_options, function (response) {
        console.log("STATUS: " + response.statusCode);
        response.on("data", function (chunk) {
          body += chunk;
        });
        response.on("end", function () {
          res.json(body);
          console.log("body", body);
        });
      })
      .end(JSON.stringify(Object.assign({}, baseData, data)));
  };

  getWhoisData("bulkWhois", { domains: searchString });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
