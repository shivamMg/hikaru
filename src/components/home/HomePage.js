import React from 'react';
import { Link } from 'react-router';
import { Grid, Header, Icon, Container, Image } from 'semantic-ui-react';

class HomePage extends React.Component {
  render() {
    return (
      <Container>
        <br/><br />
        <Image src={require('../../images/hikaru.png')}  alt="hikaru" size="large" centered />

        <Grid columns="equal">
          <Grid.Column>
            <Header floated="right" size="large" content={<Link to="about">About</Link>} />
          </Grid.Column>
          <Grid.Column>
            <Header floated="left" size="large" content={<Link to="projects">Gallery</Link>} />
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
