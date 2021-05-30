import { TextField, TextFieldProps } from "@material-ui/core";
import { getIn, FieldProps } from "formik";

type FormikTextFieldProps = TextFieldProps & FieldProps;

const FormikTextField = (props: FormikTextFieldProps) => {
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

export default FormikTextField;
