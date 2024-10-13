import { TextField } from "@mui/material";

const OutlinedTextField = ({
    label = 'Default Label',
    variant = 'outlined',
    name='',
    fullWidth = true,
    margin = 'normal',
    required = '',
    helperText = '',
    error = false,
    customStyles = {},
    onChange,
    disable={},
    ...rest
  }) => {
    return (
      <TextField
        label={label}
        name={name}
        variant={variant}
        fullWidth={fullWidth}
        // margin={margin}
        required={required}
        helperText={helperText}
        error={error}
        onChange={onChange}
        sx={{ ...customStyles }}
        {...rest}
      />
    );
  };
  
  export default OutlinedTextField;