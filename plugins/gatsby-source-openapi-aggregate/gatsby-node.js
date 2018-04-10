const crypto = require(`crypto`);
const specProcessorFactory = require("./processors/factory");

const toHash = value => {
  return crypto
    .createHash(`md5`)
    .update(value)
    .digest(`hex`);
};

const toNode = (data, type) => {
  const openApiPrefix = "openapi.";

  if (!data) {
    throw new Error("No data object specified");
  }

  if (!type) {
    throw new Error("No type specified");
  }

  if (!data.hasOwnProperty("id")) {
    throw new Error("Data object has no id property");
  }

  const node = Object.assign(
    {
      id: `${openApiPrefix}${data.id}`,
      parent: data.parent ? `${openApiPrefix}${data.parent}` : null,
      children: (data.children || []).map(c => `${openApiPrefix}${c}`),
      internal: {
        type
      }
    },
    data.fields
  );

  node.internal.contentDigest = toHash(JSON.stringify(data.fields));
  return node;
};

exports.sourceNodes = async ({ boundActionCreators }, options) => {
  const { createNode } = boundActionCreators;

  // TODO: validate options [{ name, resolve }]
  // each name should be unique, only name and resolve properties should be present
  // also, resolve should be a function which returns a promise
  options.specs.forEach(async spec => {
    let jsonText = null;
    try {
      jsonText = await spec.resolve();
    } catch (exception) {
      console.warn(
        `There was an error resolving spec '${spec.name}', ${exception.name} ${
          exception.message
        } ${exception.stack}`
      );
    }

    if (jsonText === null) {
      return;
    }

    try {
      const json = JSON.parse(jsonText);
      const processor = specProcessorFactory(json);
      const { information, paths, responses, definitions } = processor(
        spec.name,
        json
      );

      //
      const nodes = [];
      nodes.push(toNode(information, "OpenApiSpec"));
      paths.forEach(p => {
        nodes.push(toNode(p, "OpenApiSpecPath"));
      });

      nodes.forEach(n => {
        createNode(n);
      });
    } catch (exception) {
      console.error(
        `There was an error processing spec '${spec.name}', ${exception.name} ${
          exception.message
        } ${exception.stack}`
      );
    }
  });
};
