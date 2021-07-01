import {
  Button,
  MenuItem,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

export const renderText = ({ type, label, color, ...rest }) => (
  <Typography variant={type} color={color} {...rest}>
    {label}
  </Typography>
);

export const renderInputField = ({
  name,
  label,
  type,
  data,
  errors,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      type={type ? type : "text"}
      variant='outlined'
      color='primary'
      size='small'
      fullWidth={true}
      name={name}
      value={data[name]}
      error={errors[name] ? true : false}
      helperText={errors[name] ? errors[name] : ""}
      onChange={onChange}
    />
  );
};

export const renderSelect = ({
  name,
  label,
  options,
  data,
  errors,
  onChange,
}) => {
  return (
    <TextField
      select
      label={label}
      variant='outlined'
      color='primary'
      size='small'
      fullWidth={true}
      name={name}
      value={data[name]}
      error={errors[name] ? true : false}
      helperText={errors[name] ? errors[name] : ""}
      onChange={onChange}>
      {options.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.key}
        </MenuItem>
      ))}
    </TextField>
  );
};

export const renderButton = ({ label, variant, color, fullWidth, onClick }) => (
  <Button
    variant={variant ? variant : "outlined"}
    color={color ? color : "primary"}
    fullWidth={fullWidth ? fullWidth : false}
    onClick={onClick}>
    {label}
  </Button>
);

export const AlertDialog = ({
  initialState,
  title,
  content,
  action,
  handleClose,
}) => (
  <Dialog
    open={initialState}
    onClose={handleClose}
    aria-labelledby={`${title}-title`}
    aria-describedby={`${title}-description`}>
    <DialogTitle id={title}>{title}</DialogTitle>
    <DialogContent>{content}</DialogContent>
    <DialogActions>{action}</DialogActions>
  </Dialog>
);
