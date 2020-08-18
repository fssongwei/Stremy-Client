import React from "react";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import LinearProgress from "@material-ui/core/LinearProgress";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    if (this.props.stream) {
      this.props.deleteStream(this.props.match.params.id);
    }
    return (
      <>
        <LinearProgress />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
