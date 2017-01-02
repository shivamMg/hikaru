import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, Container } from 'semantic-ui-react';
import * as projectActions from '../../actions/projectActions';
import ProjectList from './ProjectList';
import { userIsStaff } from './helpers';

class UnapprovedProjectsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { projects: [] };
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
    this.props.actions.loadProjects({ approved: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects.length > 0) {
      this.setState({ projects: nextProps.projects });
    }
  }

  render() {
    const { projects } = this.state;

    return (
      <Container>
        <Header size="large" color="grey" content="Unapproved Projects" />

        <ProjectList
          projects={projects}
          showModifyLinks
        />
      </Container>
    );
  }
}

UnapprovedProjectsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

UnapprovedProjectsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    projects: state.projects.projects,
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnapprovedProjectsPage);
