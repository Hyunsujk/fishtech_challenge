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
  const [data, setData] = React.useState(null);

  const handleSearch = () => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
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
              <TextField fullWidth label="Search data" variant="outlined" />
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ResultContainer variant="outlined">{data}</ResultContainer>
        </Grid>
      </Grid>
    </LayoutContainer>
  );
};

export default Home;
