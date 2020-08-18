import React from "react";
import { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          client_id:
            "908536513205-ts2egq3rb0oe9rkqm3n1kmp5mn1k741j.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isLogIn) => {
    if (isLogIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isLogIn === null) return null;
    if (this.props.isLogIn) {
      return (
        <Button
          style={{ textTransform: "none" }}
          color="inherit"
          onClick={() => {
            this.auth.signOut();
          }}
        >
          <Box mr={1}>
            <i className="fab fa-google"></i>
          </Box>
          Sign Out
        </Button>
      );
    } else {
      return (
        <Box ml={1}>
          <Button
            style={{ textTransform: "none" }}
            color="inherit"
            onClick={() => {
              this.auth.signIn();
            }}
          >
            <Box mr={1}>
              <i className="fab fa-google"></i>
            </Box>
            Sign in with Google
          </Button>
        </Box>
      );
    }
  }

  render() {
    return <Fragment>{this.renderAuthButton()} </Fragment>;
  }
}

const mapStateToProps = (state) => {
  return { isLogIn: state.auth.isLogIn, userId: state.auth.userId };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
