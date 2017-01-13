import React, { PropTypes } from 'react';
import { Header, Menu, Button } from 'semantic-ui-react';
import LoginSignupModal from './LoginSignup';
import { openAuthModal, logoutUser } from '../../actions/authActions';

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { activeItem: '' };

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
  }

  render() {
    const { dispatch, isAuthenticated } = this.props;

    return (
      <Menu>
        <Menu.Item name="home" onClick={this.pageRedirect}>
          <Header className="hikaru-navbar" color="grey" content="hikaru" />
        </Menu.Item>
        <Menu.Item name="projects" onClick={this.pageRedirect}>
          Gallery
        </Menu.Item>

        {isAuthenticated &&
          <Menu.Item name="projects/create" onClick={this.pageRedirect}>
            Submit Project
          </Menu.Item>
        }

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
                <Button compact basic grey icon="sign out" content="Logout"
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
