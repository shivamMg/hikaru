import React, { PropTypes } from 'react';
import { Segment, Grid, Header, Container } from 'semantic-ui-react';

class AboutPage extends React.Component {
  render() {
    return (
      <Container>
        <br /><br />

        <Grid centered>
          <Grid.Column width="8">
            <Segment size="big" textAlign="center" color="green">
              <Header size="medium" color="grey" content="About Hikaru" />
              <p>
                <a href="">hikaru</a> is Project showcase Gallery for Developers at <a href="">devup.in</a>.
              </p>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default AboutPage;
