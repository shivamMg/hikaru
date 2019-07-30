import { knuthShuffle } from 'knuth-shuffle';
import projects from '../../data/projects';

/* Helper function to sort projects by date (Schwartzian transform) */
const sortByDate = (projects, rev = false) => {
  // Create a tempList with calculated date (secs from epoch)
  let tempList = [];
  projects.map((project, i) => {
    tempList.push({
      index: i,
      date: Date.parse(project.created_at)
    });
  });

  // Sort tempList based on date
  tempList.sort((a, b) => {
    const diff = a.date - b.date;
    return (rev) ? -diff : diff;
  });

  // Calculate new projects list
  let newProjects = [];
  tempList.map((a) => {
    newProjects.push(projects[a.index]);
  });

  return newProjects;
};

export const sortProjects = (projects, sortValue) => {
  if (sortValue === 'created-asc') {
    /* oldest */
    projects = sortByDate(projects);
  } else if (sortValue === 'created-des') {
    /* newest */
    projects = sortByDate(projects, true);
  } else if (sortValue === 'random') {
    /* random */
    projects = knuthShuffle(projects);
  }

  return projects;
};

export const tagList = () => {
  // let tags = [];
  // let project = '';
  // let element = '';
  // for (project of projects) {
  //   for (element of project.tags){
  //     tags.push(element);
  //   }
  //   console.log(tags);
  // }
  // return tags;
  let tags = [
    {
        "name": "javascript"
    },
    {
        "name": "python"
    }
  ];
return tags;
};