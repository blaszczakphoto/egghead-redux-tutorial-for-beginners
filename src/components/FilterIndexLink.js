import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';

const FilterIndexLink = ({ children }) => (
  <IndexLink
    to="/"
    activeStyle={{ textDecoration: 'none', color: 'black' }}
  >
    {children}
  </IndexLink>
);

FilterIndexLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterIndexLink;
