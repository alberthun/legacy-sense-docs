import React from 'react';
import Spec from './Spec';

const Specs = ({ specs }) => (
  <div>
    <ul>
      {specs.map(s => <Spec key={s.name} name={s.name} title={s.title} />)}
    </ul>
  </div>
);

export default Specs;
