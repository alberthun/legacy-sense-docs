import React from "react";

const superScriptStyle = {
  position: "relative",
  top: "-0.5em",
  fontSize: "0.6rem",
  color: "rgba(255,0,0,.6)"
};

const SpecPathParameter = ({ name, source, description, type, required }) => (
  <tr>
    <td>
      <p style={{ marginBottom: "0.5rem" }}>
        {name} {required && <span style={superScriptStyle}>* required</span>}
      </p>
      {type && (
        <p fontWeight="600" marginBottom="0">
          {type}
        </p>
      )}
      {source && (
        <p>
          <em>({source})</em>
        </p>
      )}
    </td>
    <td>{description}</td>
  </tr>
);

const SpecPathParameters = ({ parameters }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {parameters.map(p => (
        <SpecPathParameter
          key={`parameter-${p.name}-${p.in}`}
          name={p.name}
          source={p.in}
          description={p.description}
          type={p.type}
          format={p.format}
          required={p.required}
        />
      ))}
    </tbody>
  </table>
);

export default SpecPathParameters;
