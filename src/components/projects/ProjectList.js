import React, {PropTypes} from 'react';
import ProjectCard from './ProjectCard';
import { Card } from 'semantic-ui-react';

const ProjectList = ({ projects, showModifyLinks }) => {
  return (
    <Card.Group stackable itemsPerRow={3} className="margin-top-10">
      {projects.map(project =>
        <ProjectCard key={project.id} project={project} showModifyLinks={showModifyLinks} />
      )}
    </Card.Group>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired
};

export default ProjectList;
