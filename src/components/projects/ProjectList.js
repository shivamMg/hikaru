import React, {PropTypes} from 'react';
import ProjectCard from './ProjectCard';
import { Card } from 'semantic-ui-react';

const CardColors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown'];

const ProjectList = ({ projects, onTagClick, showModifyLinks }) => {
  return (
    <Card.Group stackable itemsPerRow={3} className="margin-top-10">
      {projects.map(( project, index ) =>
        <ProjectCard
          key={index}
          project={project}
          onTagClick={onTagClick}
          showModifyLinks={showModifyLinks}
          cardColor={CardColors[project.id % CardColors.length]}
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
