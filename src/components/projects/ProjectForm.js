import React, { PropTypes } from 'react';
import { Header, Modal, Grid, Message, Icon, Button, Segment, Form } from 'semantic-ui-react';

const ProjectForm = ({ project, onSubmit, onChange, loading, errors, showApproveField, showDeleteButton, onDelete }) => {
  return (
  <div>
    <Segment>
    <Form onSubmit={onSubmit} error>
      <Message error content={errors.non_field_errors} />

      {showApproveField &&
        <Segment compact>
          <Form.Radio toggle checked={project.approved} label="Approve Project" name="approved"
            value="approved" onChange={onChange} />
        </Segment>
      }

      <Form.Input type="text" placeholder="Project Name" label="Name *" name="name"
        value={project.name} onChange={onChange} error={errors.name ? true : false} />
      <Message error list={errors.name} />
      <Form.TextArea placeholder="Project Description" label="Description *" name="description"
        value={project.description} onChange={onChange} error={errors.description ? true : false} />
      <Message error list={errors.description} />

      <Form.Input type="url" placeholder="Project Website Link" label="Website" name="websiteLink"
        value={project.websiteLink} onChange={onChange} error={errors.websiteLink ? true : false} />
      <Message error list={errors.websiteLink} />
      <Form.Input type="url" placeholder="Project Source Link" label="Source *" name="sourceLink"
        value={project.sourceLink} onChange={onChange} error={errors.sourceLink ? true : false} />
      <Message error list={errors.sourceLink} />

      <Form.Input type="text" placeholder="Comma Separated Tags" label="Tags" name="tags"
        value={project.tags.map(tag => tag.name)} onChange={onChange} error={errors.tags ? true : false} />
      {errors.tags &&
        <Message error list={errors.tags[0].name} />
      }

      <Form.Input type="text" placeholder="Author Name" label="Author *" name="author"
        value={project.author} onChange={onChange} error={errors.author ? true : false} />
      <Message error list={errors.author} />
      <Form.Input type="text" placeholder="Author Link" label="Author Link" name="authorLink"
        value={project.authorLink} onChange={onChange} error={errors.authorLink ? true : false} />
      <Message error list={errors.authorLink} />

      <Form.Button type="submit" color="green" content="Submit" />
    </Form>
    </Segment>

    {showDeleteButton &&
      <Modal trigger={<Button color="red" content="Delete Project" icon="trash" />} basic size="small" closeIcon="close">
        <Header icon="trash" content="Delete Project" />
        <Modal.Content>
          <p>Are you sure you want to delete the project?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={onDelete}>
            <Icon name="trash" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    }
  </div>
  );
};

ProjectForm.propTypes = {
  project: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  showApproveField: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func
};

export default ProjectForm;
