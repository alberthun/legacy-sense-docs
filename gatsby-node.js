const path = require("path");

function stripOrderingNumbers(str) {
  return str.replace(/^(\d+-)/, "");
}

function getMarkdownPath({ fileAbsolutePath }) {
  const ext = path.extname(fileAbsolutePath);
  const file = stripOrderingNumbers(path.basename(fileAbsolutePath, ext));
  const dir = stripOrderingNumbers(
    path
      .dirname(fileAbsolutePath)
      .split(path.sep)
      .pop()
  );

  return `/guides/${dir}${file === "index" ? "" : `/${file}`}`;
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const documentationTemplate = path.resolve("src/templates/guide.js");
  const redirectTemplate = path.resolve("src/templates/redirect.js");

  return graphql(`
    {
      allOpenApiSpec {
        edges {
          node {
            id
            name
            title
            spec
            childrenOpenApiSpecPath {
              tag
              description
              name
            }
          }
        }
      }

      allMarkdownRemark(
        limit: 1000
        sort: { order: ASC, fields: fileAbsolutePath }
        filter: { fileAbsolutePath: { regex: "/guides/" } }
      ) {
        edges {
          node {
            fileAbsolutePath
            htmlAst
            headings {
              value
              depth
            }
            frontmatter {
              title
              description
              path
            }
          }
        }
      }
    }
  `).then(result => {
    const nav = [];

    const guideParent = {
      title: "Guides",
      children: [],
      path: `/guides/`
    };
    nav.push(guideParent);

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.path) return;
      if (node.fileAbsolutePath.indexOf("index") > 0) {
        guideParent.children.push({
          title: node.frontmatter.title,
          children: []
          // redirectFrom: getMarkdownPath(node)
        });
      } else {
        const parent = guideParent.children[guideParent.children.length - 1];
        if (!parent.path) {
          parent.path = getMarkdownPath(node);
        }

        parent.children.push({
          title: node.frontmatter.title,
          path: getMarkdownPath(node)
        });
      }
    });

    const apiParent = {
      title: "API Documentation",
      children: [],
      path: `/apis/overview`
    };
    nav.push(apiParent);

    result.data.allOpenApiSpec.edges.forEach(({ node }) => {
      apiParent.children.push({
        title: node.title,
        children: [],
        path: `/apis/${node.name}`
      });

      createPage({
        path: `apis/${node.name}`,
        component: path.resolve(`./src/templates/api.js`),
        context: {
          id: node.id,
          page: node,
          nav
        }
      });
    });

    result.data.allMarkdownRemark.edges.forEach(({ node }, i) => {
      const nodePath = node.frontmatter.path || getMarkdownPath(node);
      if (
        !node.frontmatter.path &&
        node.fileAbsolutePath.indexOf("index") > 0
      ) {
        createPage({
          path: nodePath,
          component: redirectTemplate,
          context: {
            to: getMarkdownPath(result.data.allMarkdownRemark.edges[i + 1].node)
          }
        });
      } else {
        createPage({
          path: nodePath,
          component: documentationTemplate,
          context: { page: node, nav }
        });
      }
    });
  });
};
