import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Message, Header, Button, Grid, Segment, Form } from 'semantic-ui-react';
import * as authActions from '../../actions/authActions';

class LoginSignupModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      passwordsMatch: true,
      loginErrors: {},
      signupErrors: {},
      showAuthModal: false
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { loginErrors, signupErrors, showAuthModal } = nextProps;

    this.setState({
      loginErrors,
      signupErrors,
      showAuthModal
    });
  }

  handleModalClose() {
    this.props.actions.closeAuthModal();
  }

  handleLoginSubmit(event, { formData }) {
    event.preventDefault();
    const username = formData.username.trim();
    const password = formData.password.trim();
    const creds = { username: username, password };
    this.props.actions.loginUser(creds);
  }

  handleSignupSubmit(event, { formData }) {
    event.preventDefault();
    const username = formData.username.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirm_password.trim();
    if (password != confirmPassword) {
      return this.setState({ passwordsMatch: false });
    } else {
      this.setState({ passwordsMatch: true });
    }
    const creds = { username, password };
    this.props.actions.signupUser(creds);
  }

  render() {
    const { loginErrors, signupErrors } = this.props;
    const { showAuthModal } = this.state;

    return (
      <Modal basic size="small" open={showAuthModal} closeOnRootNodeClick closeOnEscape onClose={this.handleModalClose}>
        <Grid columns="equal">
          <Grid.Column>
            <Segment color="green">
              <Header icon="sign in" color="grey" content="Login" />

              <Form onSubmit={this.handleLoginSubmit} error>
                <Message error content={loginErrors.non_field_errors} />

                <Form.Input type="text" placeholder="Username" name="username"
                  error={loginErrors.username ? true : false} />
                <Message error list={loginErrors.username} />
                <Form.Input type="password" placeholder="Password" name="password"
                  error={loginErrors.password ? true : false} />
                <Message error list={loginErrors.password} />

                <Button type="submit" color="green" content="Login" />
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="green">
              <Header icon="signup" content="Signup" color="grey" />
              <Form onSubmit={this.handleSignupSubmit} error>
                <Message error content={signupErrors.non_field_errors} />

                <Form.Input type="text" placeholder="Select Username" name="username"
                  error={signupErrors.username ? true : false} />
                <Message error list={signupErrors.username} />
                <Form.Input type="password" placeholder="Enter Password" name="password"
                  error={signupErrors.password ? true : false} />
                <Message error list={signupErrors.password} />
                <Form.Input type="password" placeholder="Confirm Password" name="confirm_password"
                  error={!this.state.passwordsMatch} />

                {!this.state.passwordsMatch &&
                  <Message error content="Passwords don't match." />
                }
                <Button type="submit" color="green" content="Signup" />
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Modal>
    );
  }
}

LoginSignupModal.propTypes = {
  actions: PropTypes.object.isRequired,
  loginErrors: PropTypes.object,
  signupErrors: PropTypes.object,
  showAuthModal: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  const { loginErrors, signupErrors, showAuthModal } = state.auth;

  return {
    loginErrors,
    signupErrors,
    showAuthModal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupModal);
