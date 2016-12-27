import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, Container, Header } from 'semantic-ui-react';
import ProjectForm from './ProjectForm';
import * as projectActions from '../../actions/projectActions';

class CreateProjectPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      project: {
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
      isCreated: false,
      showModal: false
    };

    this.updateProjectState = this.updateProjectState.bind(this);
    this.createProject = this.createProject.bind(this);
    this.redirectToProjectsPage = this.redirectToProjectsPage.bind(this);
  }

  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.context.router.push('/projects');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors,
      isCreated: nextProps.isCreated
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

  createProject(event) {
    event.preventDefault();
    this.props.actions.createProject(this.state.project).then(() => {
      if (this.state.isCreated) {
        this.setState({
          showModal: true,
          isCreated: false
        });
      }
    });
  }

  redirectToProjectsPage(event) {
    this.setState({ showModal: false });
    this.context.router.push('/projects');
  }

  render() {
    const { project, showModal, errors } = this.state;

    return (
      <Container>
        <Header size="large" color="grey" content="Submit Project" />
        <ProjectForm
          onSubmit={this.createProject}
          onChange={this.updateProjectState}
          errors={errors}
          project={project} />

        <Modal basic size="small" open={showModal}>
          <Header color="green" content="Project submitted successfully" />
          <Modal.Content>
            <p>Your project has been submitted for approval.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted content="OK" onClick={this.redirectToProjectsPage} />
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

CreateProjectPage.propTypes = {
  errors: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  isCreated: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

CreateProjectPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.projects.errors,
    isCreated: state.projects.isCreated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectPage);
