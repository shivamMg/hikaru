import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Home page shit for Showcase</p>
        <p>
        <Link to="about">About Showcase</Link><br/>
        <Link to="projects">Go to Projects</Link><br/>
        </p>
      </div>
    );
  }
}

export default HomePage;
