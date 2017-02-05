import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header } from 'semantic-ui-react';
import toastr from 'toastr';
import ProjectForm from './ProjectForm';
import * as projectActions from '../../actions/projectActions';
import { userIsStaff } from './helpers';

class ModifyProjectPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      project: {
        id: 0,
        name: '',
        description: '',
        sourceLink: '',
        websiteLink: '',
        tags: [],
        author: '',
        authorLink: '',
        approved: false
      },
      errors: {},
      isModified: false,
      isDeleted: false,
      isLoadingForm: false
    };

    this.updateProjectState = this.updateProjectState.bind(this);
    this.modifyProject = this.modifyProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  componentWillMount() {
    if (!this.props.isAuthenticated) {
      return this.context.router.push('/projects');
    }

    // Check if user belongs to staff
    if (!userIsStaff()) {
      return this.context.router.push('/404');
    }
  }

  componentDidMount() {
    this.props.actions.loadProject(this.props.projectId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.project.id !== nextProps.project.id) {
      this.setState({ project: Object.assign({}, nextProps.project) });
    }

    this.setState({
      errors: nextProps.errors,
      isModified: nextProps.isModified,
      isDeleted: nextProps.isDeleted,
      isLoadingForm: nextProps.isLoadingForm
    });
  }

  updateProjectState(event, field) {
    let project = this.state.project;

    if (field.name === 'tags') {
      /* For tags, break CSV to Object list */
      const tagList = field.value.split(',');
      project.tags = tagList.map(tagname => ({ name: tagname }));
    } else if (field.name === 'approved') {
      /* For approval field */
      project.approved = field.checked;
    } else {
      project[field.name] = field.value;
    }

    return this.setState({ project: project });
  }

  modifyProject(event) {
    event.preventDefault();
    this.props.actions.modifyProject(this.state.project).then(() => {
      if (this.state.isModified) {
        toastr.success('Project updated');
        this.setState({ isModified: false });
      }
    });
  }

  deleteProject(event) {
    event.preventDefault();
    this.props.actions.deleteProject(this.state.project).then(() => {
      if (this.state.isDeleted) {
        toastr.success('Project deleted');
        this.setState({ isDeleted: false });
      }
    });
    /* Redirect to Projects page */
    this.context.router.push('/projects');
  }

  render() {
    const { project, errors, isLoadingForm } = this.state;

    return (
      <Container>
        <Header size="large" color="grey" content="Modify Project" />
        <ProjectForm
          onSubmit={this.modifyProject}
          onChange={this.updateProjectState}
          errors={errors}
          project={project}
          showApproveField
          showDeleteButton
          onDelete={this.deleteProject}
          isLoadingForm={isLoadingForm}
        />
      </Container>
    );
  }
}

ModifyProjectPage.propTypes = {
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  isModified: PropTypes.bool.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoadingForm: PropTypes.bool.isRequired
};

ModifyProjectPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const projectId = parseInt(ownProps.params.id);
  const { project, errors, isModified, isDeleted, isLoadingForm } = state.projects;

  return {
    projectId,
    project,
    errors,
    isModified,
    isDeleted,
    isAuthenticated: state.auth.isAuthenticated,
    isLoadingForm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyProjectPage);
