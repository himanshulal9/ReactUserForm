import React, { useState } from "react";
import {
  Box,
  makeStyles,
  Grid,
  Card,
  CircularProgress,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { styles } from "./styles";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import { deleteFirebaseItem } from "../databaseDriver";
import { AlertDialog } from "./common";
import { red } from "@material-ui/core/colors";
import { toast } from "react-toastify";

const useStyles = makeStyles(styles);

export default function UploadedData({ users, setFetched }) {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState("");
  //for dialog Purpose
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const DialogContent = () => (
    <Box>
      <Typography align='center' gutterBottom={true}>
        <ErrorOutlineOutlinedIcon
          style={{ fontSize: "55px", color: red[500] }}
        />
      </Typography>
      <Typography align='center' variant='h6' component='h5'>
        Are You Sure To Delete ?
      </Typography>
    </Box>
  );

  //delete firebase item
  const deleteItem = () => {
    deleteFirebaseItem(currentId);
    toast.success(`Deleted Successfully`);
    setOpen(false);
    setFetched(false);
  };

  return (
    <div className={classes.uploadDataRoot}>
      <AlertDialog
        initialState={open}
        content={<DialogContent />}
        action={
          <Box mt={2}>
            <Button
              onClick={handleClose}
              variant='outlined'
              color='default'
              style={{ marginRight: "8px" }}>
              Cancle
            </Button>
            <Button
              onClick={deleteItem}
              variant='contained'
              color='secondary'
              autoFocus>
              Delete
            </Button>
          </Box>
        }
        handleClose={handleClose}
      />
      <Grid container>
        {users.length === 0 ? (
          <Grid item xs={12}>
            <Typography align='center'>No Data To Show</Typography>
            <Typography align='center' variant='subtitle2' color='error'>
              Plz Add Data Through Form
            </Typography>
          </Grid>
        ) : users.length > 0 ? (
          users.map((item, i) => (
            <Grid item xs={12} key={i}>
              <Card className={classes.cardData}>
                <CardContent>
                  <IconButton
                    color='secondary'
                    className={classes.deletebutton}
                    onClick={() => {
                      handleClickOpen();
                      setCurrentId(item.id);
                    }}>
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                  <Typography
                    variant='body1'
                    component='h6'>{` ${item.firstName} ${item.lastName}`}</Typography>
                  <Typography variant='body1'>{item.email}</Typography>
                  <Typography variant='body2'>{item.gender}</Typography>
                  <Typography variant='body2'>{item.suggession}</Typography>
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
      </Grid>
    </div>
  );
}
