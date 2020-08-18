import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream();
  }

  render() {
    if (!this.props.stream) {
      return (
        <>
          <LinearProgress />
        </>
      );
    }
    return (
      <Container>
        <div>
          <h3>{this.props.stream.title}</h3>
          <p>{this.props.stream.description}</p>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
