import React from "react";
import { reduxForm, Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

class StreamForm extends React.Component {
  rednerInput = ({ input, label, meta, nRows }) => {
    return (
      <Box my={3}>
        <TextField
          variant="outlined"
          error={meta.error && meta.touched}
          label={label}
          helperText={meta.touched && meta.error}
          {...input}
          fullWidth
          multiline
          rows={nRows}
        />
      </Box>
    );
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        autoComplete="off"
      >
        <Field
          name="title"
          component={this.rednerInput}
          label="Enter Title"
          nRows={1}
        />
        <Field
          name="description"
          component={this.rednerInput}
          label="Enter Description"
          nRows={3}
        />
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    );
  }
}

const validate = (inputValues) => {
  const errors = {};

  if (!inputValues.title) {
    errors.title = "You must enter a title";
  }

  if (!inputValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "StreamCreate",
  validate,
})(StreamForm);

export default formWrapped;
