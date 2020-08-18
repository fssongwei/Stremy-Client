import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Modal from "../../Modal";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="edit"
            component={Link}
            to={`streams/edit/${stream.id}`}
          >
            <EditIcon />
          </IconButton>

          <Modal
            TrigerBtn={(onButtonClick) => {
              return (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={onButtonClick}
                >
                  <DeleteIcon />
                </IconButton>
              );
            }}
            title="Are you sure you want to delete the stream below?"
            content={stream.description}
            consentBtn={
              <Button
                color="secondary"
                component={Link}
                to={`streams/delete/${stream.id}`}
              >
                Delete
              </Button>
            }
            cancelBtn={(handleClose) => {
              return (
                <Button onClick={handleClose} color="primary" autoFocus>
                  Cancel
                </Button>
              );
            }}
          />
        </ListItemSecondaryAction>
      );
    } else return null;
  }

  renderList() {
    return this.props.streams.map((stream, id, array) => {
      return (
        <Fragment key={stream.id}>
          <ListItem
            button
            alignItems="flex-start"
            component={Link}
            to={`streams/${stream.id}`}
          >
            <ListItemText
              primary={stream.title}
              secondary={stream.description}
            />
            {this.renderAdmin(stream)}
          </ListItem>
          {id !== array.length - 1 && <Divider />}
        </Fragment>
      );
    });
  }

  render() {
    return (
      <Container>
        <List>{this.renderList()}</List>

        {this.props.isLogIn && (
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right" }}
            component={Link}
            to="/streams/new"
          >
            Create Stream
          </Button>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isLogIn: state.auth.isLogIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
