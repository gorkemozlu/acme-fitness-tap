import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "./HighlightComponent"; 
import { getTokenFromAuthClient } from "../redux/ActionCreators";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  getToken: (authClient) => {
    console.log("---Get Token");
    dispatch(getTokenFromAuthClient(authClient));
  }
});

const mapStateToProps = (state) => {
  return {
    authToken: state.authToken,
  }
};

class ProfileComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.authToken.isLoading 
        || this.props.authToken.errMess != null 
        || this.props.authToken.authToken != null) {
      return;
    }
    console.log("************ CDM");
    this.props.getToken(this.props.authClient);
  }

  render() {
    return (
      <Container className="mb-5">
        <Row className="align-items-center profile-header mb-5 text-center text-md-left">
          <Col md={2}>
            <img
              src={this.props.user.picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          </Col>
          <Col md>
            <h2>{this.props.user.name}</h2>
            <p className="lead text-muted">{this.props.user.email}</p>
          </Col>
        </Row>
        <Row>
          <Highlight>{JSON.stringify(this.props.user, null, 2)}</Highlight>
        </Row>
        {this.props.authToken != null && (
          <Row>
            <Highlight>{JSON.stringify({"auth token": this.props.authToken}, null, 2)}</Highlight>
          </Row>
        )}
      </Container>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
