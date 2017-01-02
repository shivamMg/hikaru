import React, {PropTypes} from 'react';
import ProjectCard from './ProjectCard';
import { Card } from 'semantic-ui-react';

const ProjectList = ({ projects, onTagClick, showModifyLinks }) => {
  return (
    <Card.Group stackable itemsPerRow={3} className="margin-top-10">
      {projects.map(project =>
        <ProjectCard
          key={project.id}
          project={project}
          onTagClick={onTagClick}
          showModifyLinks={showModifyLinks}
        />
      )}
    </Card.Group>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
  onTagClick: PropTypes.func,
  showModifyLinks: PropTypes.bool
};

export default ProjectList;
