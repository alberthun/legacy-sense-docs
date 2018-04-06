import React from 'react';
import Link from 'gatsby-link';

const Spec = ({ name, title }) => (
  <li>
    <Link to={`/apis/${name}`}>{title}</Link>
  </li>
);

export default Spec;
