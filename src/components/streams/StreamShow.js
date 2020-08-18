import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  buildPlayer() {
    if (!this.player && this.props.stream) {
      this.player = flv.createPlayer({
        type: "flv",
        url: `http://localhost:8000/live/${this.props.match.params.id}.flv`,
      });
      this.player.attachMediaElement(this.videoRef.current);
      this.player.load();
    }
  }

  componentWillUnmount() {
    if (this.player) this.player.destroy();
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
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h3>{this.props.stream.title}</h3>
        <p>{this.props.stream.description}</p>
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
