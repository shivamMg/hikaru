import React, { PropTypes } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import LoginSignupModal from './LoginSignup';
import { openAuthModal, logoutUser } from '../../actions/authActions';

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {activeItem: ''};

    this.pageRedirect = this.pageRedirect.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }

  getUsername(event) {
    const token = localStorage.getItem('token');
    const base64Payload = atob(token.split('.')[1]);
    const payload = JSON.parse(base64Payload);
    return payload.username;
  }

  pageRedirect(event, item) {
    if (item.name == 'home') {
      this.context.router.push('/');
    } else {
      this.context.router.push('/' + item.name);
    }

    return this.setState({ activeItem: item.name });
  }

  render() {
    const { dispatch, isAuthenticated } = this.props;

    return (
      <Menu>
        <Menu.Item
          name="home"
          active={this.state.activeItem === "home"}
          onClick={this.pageRedirect}
          content="Home" />
        <Menu.Item
          name="about"
          active={this.state.activeItem === "about"}
          onClick={this.pageRedirect}
          content="About" />
        <Menu.Item
          name="projects"
          active={this.state.activeItem === "projects"}
          onClick={this.pageRedirect}
          content="Gallery" />
        <Menu.Menu position="right">
          <LoginSignupModal />

          {!isAuthenticated &&
            <Menu.Item>
              <Button color="green" content="Login &middot; Signup"
                onClick={function() { dispatch(openAuthModal()); }} />
            </Menu.Item>
          }
          {isAuthenticated &&
            <Menu.Menu position="right">
              <Menu.Item content={this.getUsername()} />
              <Menu.Item>
                <Button compact icon="sign out" content="Logout"
                  onClick={function() { dispatch(logoutUser()); }} />
              </Menu.Item>
            </Menu.Menu>
          }
        </Menu.Menu>
      </Menu>
    );
  }
}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Navbar.contextTypes = {
  router: PropTypes.object
};

export default Navbar;
