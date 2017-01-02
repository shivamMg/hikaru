import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, Icon, Button } from 'semantic-ui-react';

const ProjectCard = ({ project, onTagClick, showModifyLinks }) => {
  return (
    <Card color="teal">
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
          <a href={project.websiteLink}>{project.name}</a>
        </Card.Header>
        <Card.Meta>
          By <a href={project.authorLink} target="_blank">{project.author}</a>
        </Card.Meta>
        <Card.Description>
          {project.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {project.tags.map((tag, i) => {
          return <Button size="mini" compact content={tag.name} key={i} onClick={onTagClick} />;
        })}
      </Card.Content>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  onTagClick: PropTypes.func,
  showModifyLinks: PropTypes.bool
};

export default ProjectCard;
