import React, { PropTypes }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Grid, Header, Button, Container } from 'semantic-ui-react';
import { knuthShuffle } from 'knuth-shuffle';
import * as authActions from '../../actions/authActions';
import * as projectActions from '../../actions/projectActions';
import ProjectList from './ProjectList';
import TagsSearch from './TagsSearch';
import { userIsStaff } from './helpers';

const sortingOptions = [
  { text: 'Random', value: 'random' },
  { text: 'Newest', value: 'created-des'},
  { text: 'Oldest', value: 'created-asc'}
];

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

class ProjectsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      projectList: this.props.projects,
      tagSearchValue: []
    };

    this.redirectToCreateProjectPage = this.redirectToCreateProjectPage.bind(this);
    this.redirectToUnapprovedProjectsPage = this.redirectToUnapprovedProjectsPage.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    /* For staff members load projects on mount
     * since some projects might have been approved
     */
    if (userIsStaff()) {
      this.props.projectActions.loadProjects({ approved: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects.length > 0) {
      this.setState({ projectList: nextProps.projects });
    }
  }

  redirectToCreateProjectPage() {
    this.context.router.push('/projects/create');
  }

  redirectToUnapprovedProjectsPage() {
    this.context.router.push('/projects/unapproved');
  }

  handleQueryChange(value) {
    // value is the list of searched tags
    const queryTagList = value;
    const projects = Object.assign([], this.props.projects);

    // Display all projects for empty query
    if (queryTagList.length == 0) {
      return this.setState({
        projectList: projects,
        tagSearchValue: queryTagList
      });
    }

    let newProjectList = [];

    projects.map(project => {
      for (let i = 0; i < project.tags.length; i++) {
        let tag = project.tags[i];
        if (queryTagList.includes(tag.name)) {
          newProjectList.push(project);
          break;
        }
      }
    });

    this.setState({
      projectList: newProjectList,
      tagSearchValue: queryTagList
    });
  }

  handleTagClick(event, button) {
    /* Add tag to search query if it doesn't already exist
     * Remove tag if it already exists.
     */
    event.preventDefault();
    const selectedTag = button.content;
    const { tagSearchValue } = this.state;
    let newTagSearchValue = [];

    tagSearchValue.map(tag => {
      if (tag != selectedTag) {
        newTagSearchValue.push(tag);
      }
    });

    if (newTagSearchValue.length == tagSearchValue.length) {
      /* Add selected tag */
      newTagSearchValue.push(selectedTag);
    }

    this.handleQueryChange(newTagSearchValue);
  }

  handleSortChange(event, { value }) {
    let projectList = Object.assign([], this.state.projectList);

    if (value === 'created-asc') {
      /* oldest */
      projectList = sortByDate(projectList);
    } else if (value === 'created-des') {
      /* newest */
      projectList = sortByDate(projectList, true);
    } else if (value === 'random') {
      projectList = knuthShuffle(projectList);
    }

    this.setState({ projectList });
  }

  render() {
    const { projectList, tagSearchValue } = this.state;
    const { tagSearchOptions, isAuthenticated } = this.props;

    return (
      <Container>
        <Header size="large" color="grey" content="Gallery" />

        {isAuthenticated &&
          <p>
            <Button content="Submit Your Project" size="tiny" basic compact color="teal"
              onClick={this.redirectToCreateProjectPage} />
            {userIsStaff() &&
              <Button content="Unapproved Projects" size="tiny" basic compact color="red"
                onClick={this.redirectToUnapprovedProjectsPage} />
            }
          </p>
        }
        {!isAuthenticated &&
          <p>
            Want to submit your own project?&nbsp;
            <a onClick={this.props.authActions.openAuthModal} style={{ cursor: "pointer" }}>Log in</a>.
          </p>
        }

        <div className="margin-top-10">
          <Grid stackable>
            <Grid.Column width={10}>
              <TagsSearch
                options={tagSearchOptions}
                onQueryChange={this.handleQueryChange}
                value={tagSearchValue}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Dropdown placeholder="Sort" selection fluid
                options={sortingOptions}
                onChange={this.handleSortChange}
                defaultValue="random"
              />
            </Grid.Column>
          </Grid>
        </div>

        <ProjectList
          projects={projectList}
          onTagClick={this.handleTagClick}
          showModifyLinks={userIsStaff()}
        />
      </Container>
    );
  }
}

ProjectsPage.propTypes = {
  authActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  tagSearchOptions: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

ProjectsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let tagSearchOptions = [];
  state.tags.map(tag => {
    tagSearchOptions.push({ text: tag.name, value: tag.name });
  });

  return {
    projects: state.projects.projects,
    tagSearchOptions: tagSearchOptions,
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    projectActions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
