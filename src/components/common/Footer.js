import React, { PropTypes } from 'react';
import { List, Container, Segment, Header } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Segment vertical inverted className="footer">
      <Container>
        <Header size="medium" inverted content="hikaru" />
        <List size="small" inverted horizontal divided link>
          <List.Item>
            About
          </List.Item>
          <List.Item>
            Gallery
          </List.Item>
          <List.Item>
            Devup.in
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};

export default Footer;
