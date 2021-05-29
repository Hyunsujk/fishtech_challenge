const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.post("/getData", (req, res) => {
  console.log("req", req.body);
  res.json(req.body.search_string);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
