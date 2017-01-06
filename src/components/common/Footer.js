import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { List, Container, Segment, Header } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Segment vertical >
      <Container>
        <Header size="medium" className="hikaru-footer">
          <Link to="">hikaru</Link>
        </Header>

        <List size="small" horizontal divided link>
          <List.Item>
            <Link to="projects">Gallery</Link>
          </List.Item>
          <List.Item>
            Maintained by folks at <a href="http://devup.in/" target="_blank">Dev Up</a>
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};

export default Footer;
