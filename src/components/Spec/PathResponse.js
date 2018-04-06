import React from 'react';
import { verbColor } from './Verb';
import SpecDefinition from './Definition';

const getInsetStyle = color => ({
  border: `1px solid ${color}`,
  borderRadius: '4px',
  padding: '0.8rem',
  marginBottom: '1rem',
});

const SpecPathResponse = ({
  verb, statusCode, description, definitions
}) => (
  <div
    style={{
      ...getInsetStyle(verbColor(verb).normal),
      boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, .2)'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h4 style={{ flex: '1 1 50%' }}>{statusCode}</h4>
      <p style={{ flex: '1 1 50%' }}>{description}</p>
    </div>
    {definitions.length === 1 ? (
      <div style={getInsetStyle('#ccc')}>
        <SpecDefinition definition={definitions[0]} />
      </div>
      ) : null}
  </div>
);

export default SpecPathResponse;
