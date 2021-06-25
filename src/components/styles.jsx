import { orange } from "@material-ui/core/colors";
import { blueGrey } from "@material-ui/core/colors";

export const styles = {
  formContainer: {
    display: "flex",
    flexFlow: "row Wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "88vh",
  },

  form: {
    padding: "10px",
    minHeight: "350px",
    height: "auto",
    marginTop: "65px",
  },
  formTitle: {
    color: blueGrey[700],
    textAlign: "center",
    margin: "10px 0px 30px 0px",
  },

  //uploadded data style
  uploadDataRoot: {
    padding: "16px",
    minHeight: "327px",
    maxHeight: "327px",
    overflowY: "auto",
  },
  cardData: {
    position: "relative",
    marginBottom: "8px",
    textTransform: "capitalize",
  },
  deletebutton: {
    position: "absolute",
    top: "0px ",
    right: "0px",
  },

  dataDisplay: {
    width: "100%",
    backgroundColor: orange[500],
    color: "white",
  },
};
