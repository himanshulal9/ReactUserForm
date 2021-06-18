import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Paper,
  withStyles,
  List,
  Card,
  ListItemText,
  ListItemIcon,
  ListItem,
} from "@material-ui/core";
import { renderInputField, renderSelect, renderText } from "./common";
import { styles } from "./styles";
import { CardContent } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";

class FormComponent extends Component {
  state = {
    data: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      suggession: "",
    },
    errors: {},
    uploadedData: [],
  };
  render() {
    const { classes } = this.props;

    const handleSubmit = (e) => {
      e.preventDefault();
      const { data, uploadedData } = this.state;
      uploadedData.push(data);
      this.setState({ uploadedData });
      console.log("form submitted");
      console.log(this.state.uploadedData);
    };

    const handleOnChange = ({ target }) => {
      const { data, errors } = this.state;

      target.value.length <= 3
        ? (errors[target.name] = `${target.name} have at least 3 letter`)
        : (errors[target.name] = "");

      data[target.name] = target.value;
      this.setState({ data, errors });
    };

    return (
      <Grid container className={classes.formContainer}>
        <Grid item xs={12} sm={9}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Paper component={Box} mb={1} p={2}>
              <Box pt={2} mt={1}>
                {renderText({
                  type: "h6",
                  color: "primary",
                  label: "Simple User Form",
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
                          state: this.state,
                          onChange: handleOnChange,
                        })}
                      </Box>
                      <Box mt={1} mb={1}>
                        {renderInputField({
                          name: "middleName",
                          label: "Middle Name",
                          type: "text",
                          state: this.state,
                          onChange: handleOnChange,
                        })}
                      </Box>
                      {renderInputField({
                        name: "lastName",
                        label: "Last Name",
                        type: "text",
                        state: this.state,
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
                          state: this.state,
                          onChange: handleOnChange,
                        })}
                      </Box>
                      {renderInputField({
                        name: "suggession",
                        label: "Suggession",
                        type: "text",
                        state: this.state,
                        onChange: handleOnChange,
                      })}
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
                  {this.state.uploadedData.length ? (
                    <Card>
                      <CardContent>
                        <List>
                          {/* {Object.entries()} */}
                          {this.state.uploadedData.map((item) =>
                            Object.entries(item).map((obj, i) => (
                              <ListItem key={i}>
                                <ListItemIcon
                                  style={{ textTransform: "uppercase" }}>
                                  {obj[0] + " :-"}
                                </ListItemIcon>
                                <ListItemText
                                  style={{
                                    paddingLeft: "10px",
                                    textTransform: "capitalize",
                                  }}>
                                  {obj[1]}
                                </ListItemText>
                              </ListItem>
                            ))
                          )}
                        </List>
                      </CardContent>
                    </Card>
                  ) : (
                    <Box mb={3} mt={3} p={2}>
                      <Typography
                        variant='body2'
                        color='secondary'
                        align='center'
                        gutterBottom={true}>
                        No Data to Show
                      </Typography>
                      <Typography
                        variant='body1'
                        component='h6'
                        color='textSecondary'
                        align='center'>
                        Submit Form To See Data
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    );
  }
}

FormComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormComponent);
