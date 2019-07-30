import React, { PropTypes } from 'react';
import { Header, Menu, Button } from 'semantic-ui-react';

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { activeItem: '' };

    this.pageRedirect = this.pageRedirect.bind(this);
  }

  pageRedirect(event, item) {
    if (item.name == 'home') {
      this.context.router.push('/');
    } else {
      this.context.router.push('/' + item.name);
    }
  }

  render() {
    const { dispatch } = this.props;

    return (
      <Menu>
        <Menu.Item name="home" onClick={this.pageRedirect}>
          <Header className="hikaru-navbar" color="grey" content="hikaru" />
        </Menu.Item>
        <Menu.Item name="projects" onClick={this.pageRedirect}>
          Gallery
        </Menu.Item>
      </Menu>
    );
  }
}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired
};

Navbar.contextTypes = {
  router: PropTypes.object
};

export default Navbar;
