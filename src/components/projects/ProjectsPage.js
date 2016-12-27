import React, { PropTypes }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, Button, Container } from 'semantic-ui-react';
import * as authActions from '../../actions/authActions';
import ProjectList from './ProjectList';
import TagsSearch from './TagsSearch';
import { userIsStaff } from './helpers';

class ProjectsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      projectList: this.props.projects
    };

    this.redirectToCreateProjectPage = this.redirectToCreateProjectPage.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects.length > 0) {
      this.setState({ projectList: nextProps.projects });
    }
  }

  redirectToCreateProjectPage() {
    this.context.router.push('/projects/create');
  }

  handleQueryChange(event, { value }) {
    // value is the list of searched tags
    const queryTagList = value;
    const projects = Object.assign([], this.props.projects);

    // Display all projects for empty query
    if (queryTagList.length == 0) {
      return this.setState({projectList: projects});
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

    this.setState({ projectList: newProjectList });
  }

  render() {
    const { projectList } = this.state;
    const { tagSearchOptions, isAuthenticated } = this.props;

    return (
      <Container>
        <Header size="large" color="grey" content="Gallery" />

        {isAuthenticated &&
          <Button content="Submit Your Project" size="tiny" basic compact color="teal"
            onClick={this.redirectToCreateProjectPage} />
        }
        {!isAuthenticated &&
          <p>
            Want to submit your own project?&nbsp;
            <a onClick={this.props.authActions.openAuthModal} style={{ cursor: "pointer" }}>Log in</a>.
          </p>
        }

        <TagsSearch options={tagSearchOptions} onChange={this.handleQueryChange} />

        <ProjectList projects={projectList} showModifyLinks={userIsStaff()} />
      </Container>
    );
  }
}

ProjectsPage.propTypes = {
  authActions: PropTypes.object.isRequired,
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
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
