import { IconButton } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import {
  makeStyles,
  Grid,
  Box,
  Card,
  CircularProgress,
  CardContent,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { styles } from "./styles";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
const useStyles = makeStyles(styles);

export default function UploadedData() {
  const classes = useStyles();
  const [fetched, setFetched] = useState(false);
  const [users, setUsers] = useState([]);

  const deleteData = (id) => {
    console.log("id:", id);
    db.collection("users")
      .doc(id)
      .delete()
      .then((res) => console.log("del_response", res));
  };

  useEffect(() => {
    !fetched &&
      db
        .collection("users")
        .get()
        .then(function (item) {
          const userData = [];
          const objItem = {};
          item.forEach(function (doc) {
            objItem.id = doc.id;
            objItem.data = doc.data();
            userData.push(objItem);
          });
          //updating the state
          setUsers(userData);
          setFetched(false);
        });
  }, [fetched, deleteData]);

  return (
    <div className={classes.uploadDataRoot}>
      <Grid container>
        {users.length === 0 ? (
          <Grid item xs={12}>
            <Typography align='center'>No Data To Show</Typography>
          </Grid>
        ) : users.length > 0 ? (
          users.map((item, i) => (
            <Grid item xs={12} key={i}>
              <Card className={classes.cardData}>
                <CardContent>
                  <IconButton
                    color='secondary'
                    className={classes.deletebutton}
                    onClick={deleteData(item.id)}>
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                  <Typography
                    variant='body1'
                    component='h6'>{` ${item.data.firstName} ${item.data.lastName}`}</Typography>
                  <Typography variant='body1'>{item.data.email}</Typography>
                  <Typography variant='body2'>{item.data.gender}</Typography>
                  <Typography variant='body2'>{item.data.address}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}>
            <CircularProgress color='primary' />
          </Grid>
        )}
        {/* {users.length === 0 ? (
          
        ) : (
          <p
            style={{
              padding: "16px",
              height: "150px",
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CircularProgress color='primary' />
          </p>
        )} */}
      </Grid>
      {/* <List dense={true}>
        {users.length ? (
          users.map(({ data }) =>
            Object.entries(data).map((obj, i) => (
              <Box className={classes.dataDisplay}>
                <ListItem>
                  <ListItemIcon>{obj[0]}</ListItemIcon>
                  <ListItemText>{obj[1]}</ListItemText>
                </ListItem>
              </Box>
            ))
          )
        ) : (
          <Box
            style={{
              padding: "16px",
              height: "150px",
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CircularProgress color='primary' />
          </Box>
        )}
      </List> */}
    </div>
  );
}
