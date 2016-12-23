import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Popup, Card, Icon, Button } from 'semantic-ui-react';

const ProjectCard = ({project}) => {
  return (
    <Card color="teal">
      <Card.Content>
        <Popup content="Source" inverted basic
          trigger={
            <a href={project.sourceLink} target="_blank" className="float-right">
              <Icon name="code" />
            </a>
          } />

        <Card.Header>
          <a href={project.websiteLink}>{project.name}</a>
          <Link to={`/project/${project.id}`}>Link</Link>
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
          return <Button size="mini" compact content={tag.name} key={i} />;
        })}
      </Card.Content>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectCard;
