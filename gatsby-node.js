const path = require('path');

const documentationTemplate = path.resolve('src/templates/guide.js');
const redirectTemplate = path.resolve('src/templates/redirect.js');

function stripOrderingNumbers(str) {
  return str.replace(/^(\d+-)/, '');
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

  return `/guides/${dir}${file === 'index' ? '' : `/${file}`}`;
}

function createGuidePages(c, createPage, context) {
  const nodePath = getMarkdownPath(c.node);
  if (c.children && c.children.length) {
    createPage({
      path: nodePath,
      component: redirectTemplate,
      context: {
        to: getMarkdownPath(c.children[0].node)
      }
    });
    c.children.forEach((child) => {
      createGuidePages(child, createPage, context);
    });
  } else {
    createPage({
      path: nodePath,
      component: documentationTemplate,
      context: { page: c.node, ...context }
    });
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: ASC, fields: fileAbsolutePath }
      ) {
        edges {
          node {
            fileAbsolutePath
            html
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
  `).then((result) => {
    const nav = [];

    const guideParent = {
      title: 'Guides',
      children: [],
      path: `/guides/`
    };
    nav.push(guideParent);

    result.data.allMarkdownRemark.edges.forEach((res) => {
      if (!res.node) return;
      const { node } = res;
      if (node.frontmatter.path) return;
      if (node.fileAbsolutePath.indexOf('index') > 0) {
        guideParent.children.push({
          title: node.frontmatter.title,
          node,
          children: [],
          path: getMarkdownPath(node)
        });
      } else {
        const parent = guideParent.children[guideParent.children.length - 1];

        parent.children.push({
          title: node.frontmatter.title,
          node,
          path: getMarkdownPath(node)
        });
      }
    });

    const apiParent = {
      title: 'API Documentation',
      children: [],
      path: `/apis/overview`
    };
    nav.push(apiParent);

    /*
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
    */

    result.data.allMarkdownRemark.edges.forEach((res) => {
      if (!res.node) return;
      const { node } = res;
      if (node.frontmatter.path) {
        createPage({
          path: node.frontmatter.path,
          component: documentationTemplate,
          context: { page: node, nav }
        });
      }
    });

    guideParent.children.forEach((c) => {
      createGuidePages(c, createPage, { nav });
    });
  });
};
