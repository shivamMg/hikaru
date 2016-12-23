import React, { PropTypes } from 'react';
import { Modal, Message, Header, Button, Grid, Segment, Form } from 'semantic-ui-react';

class LoginSignupModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { passwordsMatch: true };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  handleLoginSubmit(event, { formData }) {
    event.preventDefault();
    const username = formData.username.trim();
    const password = formData.password.trim();
    const creds = { username: username, password };
    this.props.onLoginClick(creds);
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
    this.props.onSignupClick(creds);
  }

  render() {
    const { loginErrors, signupErrors } = this.props;

    return (
      <Modal trigger={<Button color="green" content="Login &middot; Signup" />} basic size="small">
        <Grid columns="equal">
          <Grid.Column>
            <Segment color="green">
              <Header icon="sign in" color="grey" content="Login" />

              <Form onSubmit={this.handleLoginSubmit} error>
                <Message error content={loginErrors.non_field_errors} />

                <Form.Input type="text" placeholder="Username" name="username" error={loginErrors.username ? true : false} />
                <Message error list={loginErrors.username} />
                <Form.Input type="password" placeholder="Password" name="password" error={loginErrors.password ? true : false} />
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

                <Form.Input type="text" placeholder="Select Username" name="username" error={signupErrors.username ? true : false} />
                <Message error list={signupErrors.username} />
                <Form.Input type="password" placeholder="Enter Password" name="password" error={signupErrors.password ? true : false} />
                <Message error list={signupErrors.password} />
                <Form.Input type="password" placeholder="Confirm Password" name="confirm_password" error={!this.state.passwordsMatch} />

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
  onLoginClick: PropTypes.func.isRequired,
  onSignupClick: PropTypes.func.isRequired,
  loginErrors: PropTypes.object,
  signupErrors: PropTypes.object
};

export default LoginSignupModal;
