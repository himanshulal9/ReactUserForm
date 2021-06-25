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
import UploadedData from "./uploadedData";

class FormComponent extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      address: "",
    },
    errors: {},
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
        <Grid item xs={12} sm={10}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Paper component={Box} mb={2} p={2}>
              <Box>
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
                      <Box mb={2}>
                        {renderInputField({
                          name: "firstName",
                          label: "First Name",
                          type: "text",
                          state: this.state,
                          onChange: handleOnChange,
                        })}
                      </Box>
                      <Box mb={2}>
                        {renderInputField({
                          name: "lastName",
                          label: "Last Name",
                          type: "text",
                          state: this.state,
                          onChange: handleOnChange,
                        })}
                      </Box>

                      <Box mb={2}>
                        {renderInputField({
                          name: "email",
                          label: "Email@example.com",
                          type: "email",
                          state: this.state,
                          onChange: handleOnChange,
                        })}
                      </Box>
                      <Box mb={2}>
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
                        name: "address",
                        label: "Address",
                        type: "text",
                        state: this.state,
                        onChange: handleOnChange,
                      })}
                    </CardContent>
                    <p
                      style={{
                        textAlign: "center",
                        padding: "0px 16px",
                        margin: "10px 0px",
                      }}>
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

                {/* uploaded data  */}
                <Grid item xs={12} sm={6}>
                  <UploadedData />
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
