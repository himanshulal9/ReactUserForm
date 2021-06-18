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
import {
  renderButton,
  renderInputField,
  renderSelect,
  renderText,
} from "./common";
import { styles } from "./styles";
import { CardContent } from "@material-ui/core";

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
      this.setState(this.state.uploadedData.push(this.state.data));
      console.log("form submitted");
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
        <Grid item xs={12} sm={7}>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <Paper component={Box} mb={1}>
              <Box pt={2}>
                {renderText({
                  type: "h6",
                  color: "primary",
                  label: "Simple user Form",
                  align: "center",
                })}
              </Box>
              <Grid container>
                <Grid xs={12} sm={6}>
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
                    <p style={{ textAlign: "center" }}>
                      {renderButton({ label: "submit" })}
                    </p>
                  </Card>
                </Grid>

                <Grid xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <List>
                        <ListItem>
                          <ListItemIcon>First Name :-</ListItemIcon>
                          <ListItemText>
                            {this.state.data.firstName}
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>Middle Name :-</ListItemIcon>
                          <ListItemText>
                            {this.state.data.middleName}
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>Last Name :-</ListItemIcon>
                          <ListItemText>
                            {this.state.data.lastName}
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>Gender :-</ListItemIcon>
                          <ListItemText>{this.state.data.gender}</ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>Suggession :-</ListItemIcon>
                          <ListItemText>
                            {this.state.data.suggession}
                          </ListItemText>
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
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
