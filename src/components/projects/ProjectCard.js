import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Reveal, Image, Card, Icon, Button } from 'semantic-ui-react';

const ProjectCard = ({ project, onTagClick, cardColor }) => {
  let websiteLink = '';
  let photoUrl = '';
  /* For empty website links use source link */
  if (project.websiteLink === '') {
    websiteLink = project.sourceLink;
  } else {
    websiteLink = project.websiteLink;
  }

  if (project.photo === null) {
    photoUrl = require('../../data/hikaru_default.png');
  } else {
    photoUrl = require('../../data/' + project.photo);
  }

  return (
    <Card color={cardColor} className="project-card">
      <Card.Content>
        <div className="float-right">
          <a href={project.sourceLink} target="_blank">
            <Icon name="code" />
          </a>
        </div>

        <Card.Header>
          <a href={websiteLink} target="_blank">{project.name}</a>
        </Card.Header>
        <Card.Meta>
          {project.authorLink &&
            <div>By <a href={project.authorLink} target="_blank">{project.author}</a></div>
          }
          {!project.authorLink &&
            <div>By {project.author}</div>
          }
        </Card.Meta>
        <Card.Description>
          <Reveal animated="fade">
            <Reveal.Content visible>
              <Image src={photoUrl} bordered fluid />
            </Reveal.Content>
            <Reveal.Content hidden>
              <div style={{ marginLeft: "1px" }}>
                <div>{project.description}</div>
              </div>
            </Reveal.Content>
          </Reveal>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {project.tags.map((tag, i) => {
          return (
            <Button size="mini" color="teal" compact basic className="tag-button"
              content={tag} key={i} onClick={onTagClick} />
          );
        })}
      </Card.Content>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  onTagClick: PropTypes.func,
  showModifyLinks: PropTypes.bool,
  cardColor: PropTypes.string.isRequired
};

export default ProjectCard;
