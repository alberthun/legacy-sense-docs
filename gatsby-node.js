const path = require('path');

function stripOrderingNumbers(str) {
  return str.replace(/^(\d+-)/, '');
}

function getMarkdownPath({ fileAbsolutePath }) {
  const ext = path.extname(fileAbsolutePath);
  const file = stripOrderingNumbers(path.basename(fileAbsolutePath, ext));
  const dir = stripOrderingNumbers(path.dirname(fileAbsolutePath).split(path.sep).pop());

  return `/guides/${dir}${file === 'index' ? '' : `/${file}`}`;
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const documentationTemplate = path.resolve('src/templates/guide.js');
  const redirectTemplate = path.resolve('src/templates/redirect.js');

  return graphql(`{
    allMarkdownRemark(
      limit: 1000,
      sort: { order:ASC, fields: fileAbsolutePath },
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
          }
        }
      }
    }
  }`)
    .then((result) => {
      if (result.errors) {
        // tests
        // issues
        // console.log(result.errors)
        // return Promise.reject(result.errors);
      }

      const nav = [];

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.fileAbsolutePath.indexOf('index') > 0) {
          const parent = { title: node.frontmatter.title, children: [], redirectFrom: getMarkdownPath(node) };

          nav.push(parent);
        } else {
          const parent = nav[nav.length - 1];
          if (!parent.path) {
            parent.path = getMarkdownPath(node);
          }

          parent.children.push({ title: node.frontmatter.title, path: getMarkdownPath(node) });
        }
      });

      result.data.allMarkdownRemark.edges
        .forEach(({ node }, i) => {
          if (node.fileAbsolutePath.indexOf('index') > 0) {
            createPage({
              path: getMarkdownPath(node),
              component: redirectTemplate,
              context: { to: getMarkdownPath(result.data.allMarkdownRemark.edges[i + 1].node) }
            });
          } else {
            createPage({
              path: getMarkdownPath(node),
              component: documentationTemplate,
              context: { page: node, nav }
            });
          }
        });
    });
};

