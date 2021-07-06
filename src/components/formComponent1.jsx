import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { styles } from "./styles";
import { Box, Grid, Paper, Card, CardContent, Button } from "@material-ui/core";
import { renderInputField, renderSelect, renderText } from "./common";
import UploadedData from "./uploadedData";
import { AddData, GetFirebaseData, getSnapUpdate } from "../databaseDriver";

const useStyles = makeStyles(styles);

export default function FormComponent1() {
  const classes = useStyles();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    suggession: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [Fetched, setFetched] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);

  const handleOnChange = ({ target }) => {
    const name = target.name;
    const value = target.value;

    //validating errors
    target.value.length < 3
      ? (errors[target.name] = setErrors({
          ...errors,
          [name]: `${name} have atleast 3 letters`,
        }))
      : (errors[target.name] = setErrors({ ...errors, [name]: "" }));

    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //api call to send data
    AddData(data).then((dataSet) => console.log("uploaded dataset", dataSet));
    //reset form field
    setData({
      firstName: "",
      lastName: "",
      suggession: "",
      gender: "",
    });

    //snap update...
    getSnapUpdate({ fx_RunOnUpdata: setFetched(false) });
  };

  useEffect(() => {
    if (!Fetched) {
      GetFirebaseData({ setUploadedData });
      setFetched(true);
    }
  }, [Fetched, uploadedData.length]);

  return (
    <Grid container className={classes.formContainer}>
      <Grid item xs={12} sm={9}>
        <form onSubmit={handleSubmit}>
          <Paper component={Box} mb={1} p={2}>
            <Box pt={2} mt={1}>
              {renderText({
                type: "h6",
                color: "primary",
                label: "Covid 19 FeedBack Form",
                align: "center",
                gutterBottom: true,
              })}
            </Box>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Box mt={1} mb={1}>
                      {renderInputField({
                        name: "firstName",
                        label: "First Name",
                        type: "text",
                        data: data,
                        errors: errors,
                        onChange: handleOnChange,
                      })}
                    </Box>

                    {renderInputField({
                      name: "lastName",
                      label: "Last Name",
                      type: "text",
                      data: data,
                      errors: errors,
                      onChange: handleOnChange,
                    })}
                    <Box mt={1} mb={1}>
                      {renderSelect({
                        name: "gender",
                        label: "Gender",
                        options: [
                          { key: "male", value: "male" },
                          { key: "female", value: "female" },
                          { key: "other", value: "other" },
                        ],
                        data: data,
                        errors: errors,
                        onChange: handleOnChange,
                      })}
                    </Box>
                    <Box mt={1} mb={1}>
                      {renderInputField({
                        name: "suggession",
                        label: "Suggession",
                        type: "text",
                        data: data,
                        errors: errors,
                        onChange: handleOnChange,
                      })}
                    </Box>
                  </CardContent>
                  <p style={{ textAlign: "center", padding: "0px 16px" }}>
                    <Button
                      type='submit'
                      color='primary'
                      variant='contained'
                      fullWidth={true}
                      size='small'>
                      Submit
                    </Button>
                  </p>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <UploadedData users={uploadedData} setFetched={setFetched} />
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
}
