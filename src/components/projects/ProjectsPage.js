import React, { PropTypes }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Header, Button, Container } from 'semantic-ui-react';
import * as projectActions from '../../actions/projectActions';
import ProjectList from './ProjectList';
import TagsSearch from './TagsSearch';

class ProjectsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      projectList: this.props.projects
    };

    this.redirectToAddProjectPage = this.redirectToAddProjectPage.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects.length > 0) {
      this.setState({ projectList: nextProps.projects });
    }
  }

  redirectToAddProjectPage() {
    browserHistory.push('/projects/create');
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
    const { tagSearchOptions } = this.props;

    return (
      <Container>
        <Header size="large" color="grey" content="Gallery" />
        <Button content="Add Your Project" size="tiny" basic compact color="teal"
          onClick={this.redirectToAddProjectPage} />
        <TagsSearch options={tagSearchOptions} onChange={this.handleQueryChange} />
        <ProjectList projects={projectList} />
      </Container>
    );
  }
}

ProjectsPage.propTypes = {
  projects: PropTypes.array.isRequired,
  tagSearchOptions: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  let tagSearchOptions = [];
  state.tags.map(tag => {
    tagSearchOptions.push({ text: tag.name, value: tag.name });
  });

  return {
    projects: state.projects.projects,
    tagSearchOptions: tagSearchOptions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
