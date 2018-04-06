import React from "react";

const SpecDefinitionProperty = ({ name, type, description, format }) => (
  <tr>
    <td>{name}</td>
    <td>{type}</td>
    <td>{description}</td>
    <td>{format}</td>
  </tr>
);

const SpecDefinition = ({ definition }) => (
  <div>
    <p style={{ fontWeight: "600", fontStyle: "italic", marginBottom: 0 }}>
      {definition.name}
    </p>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
          <th>Format</th>
        </tr>
      </thead>
      <tbody>
        {definition.properties.map(p => (
          <SpecDefinitionProperty
            key={`property-${p.name}-${p.type}`}
            name={p.name}
            type={p.type}
            description={p.description}
            format={p.format}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default SpecDefinition;
