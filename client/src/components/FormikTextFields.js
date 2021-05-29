import { TextField } from "@material-ui/core";
import { getIn } from "formik";

export const FormikTextField = (props) => {
  const { error, helperText, field, form, ...rest } = props;

  const isTouched = getIn(form.touched, field.name);
  const errorMessage = getIn(form.errors, field.name);

  return (
    <TextField
      type="input"
      variant="outlined"
      fullWidth
      required
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={
        helperText ?? (isTouched && errorMessage ? errorMessage : undefined)
      }
      {...rest}
      {...field}
    />
  );
};
