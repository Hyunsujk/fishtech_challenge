import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormikTextField } from "../components/FormikTextFields";
import {
  Button,
  Grid,
  Box,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";

const LayoutContainer = styled(Box)`
  margin: 2rem;
  min-width: 90vw;
  min-height: 80vh;
`;

const ResultContainer = styled(Box)`
  border: solid 2px black;
  padding: 10px;
  height: 65vh;
  min-width: 500px;
`;

const validationSchema = Yup.object().shape({
  search: Yup.string().required("Required"),
});

const Home = () => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = (searchString) => {
    setIsLoading(true);
    fetch("/api/getData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchString: searchString.search }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.WhoisRecord);
        setIsLoading(false);
      })
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
          <Typography variant="h3">Fishtech Challenge</Typography>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={{ search: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              handleSearch(values);
              resetForm({});
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-end"
                  spacing={3}
                >
                  <Grid item xs>
                    <Field
                      component={FormikTextField}
                      label="Search Domain"
                      name="search"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      fullWidth
                      color="primary"
                      variant="contained"
                      startIcon={<SearchIcon />}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={12}>
          <ResultContainer component="div" overflow="auto" whiteSpace="normal">
            {isLoading ? (
              <LinearProgress />
            ) : (
              <div>
                <pre>{data ? JSON.stringify(data, null, 2) : null}</pre>
              </div>
            )}
          </ResultContainer>
        </Grid>
      </Grid>
    </LayoutContainer>
  );
};

export default Home;
