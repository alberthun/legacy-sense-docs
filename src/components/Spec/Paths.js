import React from 'react';
import Markdown from '../Markdown';
import Verb, { verbColor } from './Verb';
import SpecPathResponse from './PathResponse';
import SpecPathParameters from './PathParameters';

const pathStyle = verb => ({
  padding: '1rem',
  borderRadius: '4px',
  border: `2px solid ${verbColor(verb).normal}`,
  backgroundColor: verbColor(verb).lighter,
});

const SpecPath = ({ path }) => {
  const responses = path.childrenOpenApiSpecResponse;

  return (
    <div css={pathStyle(path.verb)}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '1rem' }}>
          <Verb value={path.verb} />
        </div>
        <p style={{ fontWeight: 600 }}>{path.name}</p>
        <p style={{ marginLeft: 'auto' }}>{path.summary}</p>
      </div>
      {path.parameters && <SpecPathParameters parameters={path.parameters} />}
      {path.description && <Markdown markdown={path.description} />}
      <h3>Responses</h3>
      {responses.map(r => (
        <SpecPathResponse
          key={r.id}
          verb={path.verb}
          statusCode={r.statusCode}
          description={r.description}
          definitions={r.childrenOpenApiSpecDefinition}
        />
      ))}
    </div>
  );
};


const SpecPaths = ({ tag, paths }) => (
  <div>
    <h2>{tag}</h2>
    {paths.map(p => (
      <div key={`${p.name}-${p.verb}`} marginBottom="1rem">
        <SpecPath path={p} />
      </div>
    ))}
  </div>
);

export default SpecPaths;
