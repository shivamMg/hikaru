import React, {PropTypes} from 'react';
import { Dropdown } from 'semantic-ui-react';

const TagsSearch = ({options, onChange}) => {
  return (
    <div className="margin-top-10">
      <Dropdown placeholder="Search Tags" fluid multiple search selection options={options} onChange={onChange} />
    </div>
  );
};

TagsSearch.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TagsSearch;
