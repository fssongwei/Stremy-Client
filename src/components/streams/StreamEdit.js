import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) return <div>Loading ... </div>;
    return (
      <Box p={5}>
        <Container>
          <h3>Edit Stream</h3>
          <StreamForm
            onSubmit={this.onSubmit}
            initialValues={{
              title: this.props.stream.title,
              description: this.props.stream.description,
            }}
          />
        </Container>
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
