import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikTextField from "../components/FormikTextFields";
import {
  Button,
  Grid,
  Box,
  Typography,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  layoutContainer: {
    margin: "2rem",
    minWidth: "90vw",
    minHeight: "80vh",
  },
  resultContainer: {
    border: "solid 2px black",
    padding: "10px",
    height: "65vh",
    minWidth: "500px",
  },
});

const validationSchema = Yup.object().shape({
  search: Yup.string().required("Required (example: google.com)"),
});

const Home = () => {
  const { layoutContainer, resultContainer } = useStyles();
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = (searchString: { search: string }) => {
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
    <Box className={layoutContainer}>
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
                      label="Search Domain name, IP address"
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
          <Box
            className={resultContainer}
            component="div"
            overflow="auto"
            whiteSpace="normal"
          >
            {isLoading ? (
              <LinearProgress />
            ) : (
              <div>
                <pre>{data ? JSON.stringify(data, null, 2) : null}</pre>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
