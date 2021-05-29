import React from "react";
import { Button, TextField, Paper, Grid, Box } from "@material-ui/core";
import styled from "styled-components";

const LayoutContainer = styled(Box)`
  margin: 10rem 20rem;
  min-width: 500px;
`;

const ResultContainer = styled(Paper)`
  overflow: hidden;
  overflow-y: auto;
  min-height: 500px;
`;

const Home = () => {
  const [searchString, setSearchString] = React.useState("");
  const [data, setData] = React.useState(null);

  const handleSearch = () => {
    console.log("searchString", searchString);
    fetch("/getData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchString: searchString }),
    })
      .then((res) => res.json())
      .then((data) => setData(data.WhoisRecord))
      .catch((err) => console.log(err));
  };

  return (
    <LayoutContainer>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-end"
            spacing={3}
          >
            <Grid item xs>
              <TextField
                fullWidth
                label="Search domain"
                variant="outlined"
                onChange={(e) => setSearchString(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ResultContainer variant="outlined">
            <div>{data ? JSON.stringify(data, null, 2) : null}</div>
          </ResultContainer>
        </Grid>
      </Grid>
    </LayoutContainer>
  );
};

export default Home;
