import React from 'react';
import { Link } from 'react-router';
import { Grid, Header, Icon, Container, Image } from 'semantic-ui-react';

class HomePage extends React.Component {
  render() {
    return (
      <Container>
        <br/><br />
        <Header size="huge" className="hikaru-home" textAlign="center">
          hikaru
        </Header>

        <Grid columns="equal">
          <Grid.Column>
            <Header size="medium" textAlign="center" color="grey" className="hikaru-home-subheader">
              Projects Showcase <Link to="projects">Gallery</Link> for peeps at <a href="http://devup.in" target="_blank">Dev Up</a>
            </Header>
          </Grid.Column>
        </Grid>

        <p className="hikaru-code-container">
          <a href="http://github.com/shivammg/hikaru" target="_blank" className="hikaru-code-link">
            <Icon name="code" />
          </a>
        </p>
      </Container>
    );
  }
}

export default HomePage;
