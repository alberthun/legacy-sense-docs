const spec20Processor = (name, spec) => {
  const rootId = `spec.${name}`;

  Object.keys(spec.paths).forEach(p => {
    Object.keys(spec.paths[p]).forEach(v => {
      if (v === "parameters") {
        const { parameters } = spec.paths[p];
        delete spec.paths[p].parameters;
        Object.keys(spec.paths[p]).forEach(path => {
          path.parameters = [].concat(path.parameters || [], parameters);
        });
      }
    });
  });

  const paths = [];
  Object.keys(spec.paths).forEach(p => {
    Object.keys(spec.paths[p]).forEach(v => {
      const path = spec.paths[p][v];

      paths.push({
        id: `${rootId}.path.${p}.verb.${v}`,
        parent: rootId,
        fields: {
          name: p,
          verb: v,
          summary: path.summary,
          description: path.description,
          parameters: path.parameters,
          tags: path.tags,
          tag: path.tags ? path.tags.join(",") : null
        }
      });
    });
  });

  const information = {
    id: rootId,
    parent: null,
    children: [...paths.map(p => p.id)],
    fields: {
      name,
      version: spec.info.version,
      title: spec.info.title,
      description: spec.info.description,
      spec: JSON.stringify(spec)
    }
  };

  return {
    information,
    paths
  };
};

module.exports = spec20Processor;
