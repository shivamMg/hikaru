import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import Navbar from './common/Navbar';

class App extends React.Component {
  render() {
    const { dispatch, isAuthenticated, loginErrors, signupErrors } = this.props;

    return (
      <Container fluid>
        <Navbar
          isAuthenticated={isAuthenticated}
          loginErrors={loginErrors}
          signupErrors={signupErrors}
          dispatch={dispatch} />
        {this.props.children}
      </Container>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginErrors: PropTypes.object,
  signupErrors: PropTypes.object
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, loginErrors, signupErrors } = auth;

  return { isAuthenticated, loginErrors, signupErrors };
}

export default connect(mapStateToProps)(App);
