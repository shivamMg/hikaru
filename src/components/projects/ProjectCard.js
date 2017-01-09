import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, Icon, Button } from 'semantic-ui-react';

const ProjectCard = ({ project, onTagClick, showModifyLinks, cardColor }) => {
  let websiteLink = '';
  /* For empty website links use source link */
  if (project.websiteLink === '') {
    websiteLink = project.sourceLink;
  } else {
    websiteLink = project.websiteLink;
  }

  return (
    <Card color={cardColor} className="project-card">
      <Card.Content>
        <div className="float-right">
          {showModifyLinks &&
            <Link to={`/project/${project.id}`}>
              <Icon name="edit" />
            </Link>
          }
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
          {project.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {project.tags.map((tag, i) => {
          return (
            <Button size="mini" color="teal" compact basic className="tag-button"
              content={tag.name} key={i} onClick={onTagClick} />
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
