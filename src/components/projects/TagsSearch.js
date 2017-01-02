import React, {PropTypes} from 'react';
import { Dropdown } from 'semantic-ui-react';

class TagsSearch extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { value: [] };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value.length != nextProps.value.length) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(event, { value }) {
    this.props.onQueryChange(value);
  }

  render() {
    const { options } = this.props;
    const { value } = this.state;

    return (
      <div className="margin-top-10">
        <Dropdown placeholder="Search Tags" fluid multiple search selection
          options={options}
          onChange={this.handleChange}
          value={value}
        />
      </div>
    );
  }
}

TagsSearch.propTypes = {
  options: PropTypes.array.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired
};

export default TagsSearch;
