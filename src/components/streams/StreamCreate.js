import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <Box p={5}>
        <Container>
          <h3>Create Stream</h3>
          <StreamForm onSubmit={this.onSubmit} />
        </Container>
      </Box>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
