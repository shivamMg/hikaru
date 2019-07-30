import React from 'react';
import { Link } from 'react-router';
import { Grid, Header, Icon, Container } from 'semantic-ui-react';

const NotFoundPage = () => {
  return (
    <Container>
      <br/><br />
      <Header size="huge" className="hikaru-home" textAlign="center">
        Error 404
      </Header>

      <Grid columns="equal">
        <Grid.Column>
          <Header size="medium" textAlign="center" color="grey" className="hikaru-home-subheader">
            The page you were looking for was not found.
          </Header>
          <Header size="medium" textAlign="center" color="grey" className="hikaru-home-subheader">
            You can go back to <Link to="projects">Gallery</Link> or <Link to="">home</Link>.
          </Header>
        </Grid.Column>
      </Grid>

      <p className="hikaru-code-container">
        <a href="http://github.com/ArionMiles/hikaru" target="_blank" className="hikaru-code-link">
          <Icon name="code" />
        </a>
      </p>
    </Container>
  );
};

export default NotFoundPage;
