import React from 'react';
import FilterLink from './FilterLink';
import FilterIndexLink from './FilterIndexLink';

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterIndexLink>
      All
    </FilterIndexLink>
    {' '}
    <FilterLink
      filter="completed"
    >
      Completed
    </FilterLink>
    {' '}
    <FilterLink
      filter="active"
    >
      Active
    </FilterLink>
  </p>
);

export default Footer;
