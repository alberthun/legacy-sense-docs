const path = require('path');

const documentationTemplate = path.resolve('src/templates/guide.js');
const redirectTemplate = path.resolve('src/templates/redirect.js');

function stripOrderingNumbers(str) {
  return str.replace(/^(\d+-)/, '');
}

function getMarkdownPath(dirPath, { absolutePath }, root) {
  const ext = path.extname(absolutePath);
  const file = stripOrderingNumbers(path.basename(absolutePath, ext));
  const dir = stripOrderingNumbers(
    path
      .dirname(absolutePath)
      .split(path.sep)
      .pop()
  );

  return `${dirPath}${root ? '' : dir + '/'}${
    file === 'index' ? '' : `${file}`
  }`;
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

function convertNode(node) {
  return {
    ...(node.childMarkdownRemark || {}),
    name: node.name
  };
}

function getFolder(folderPath) {
  const paths = folderPath.split('/');
  return paths[paths.length - 2];
}

function createGuidePages(c, createPage, context) {
  if (c.children && c.children.length) {
    createPage({
      path: c.path,
      component: redirectTemplate,
      context: {
        to: c.children[0].path
      }
    });
    c.children.forEach((child) => {
      createGuidePages(child, createPage, context);
    });
  } else {
    createPage({
      path: c.path,
      component: c.component || documentationTemplate,
      context: { page: c.node && convertNode(c.node), ...context }
    });
  }
}

function getMenuSection(graphql, { title, path: folderPath, folderName }) {
  const section = {
    title,
    path: folderPath,
    children: []
  };

  return graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "${folderName}" } }, limit: 1000) {
        edges {
          node {
            absolutePath
            name

            childMarkdownRemark {
              html
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
      }
    }
  `).then((result) => {
    const files = (
      (result.data && result.data.allFile && result.data.allFile.edges) ||
      []
    )
      .map((c) => c.node)
      .filter((node) => {
        if (!node || !node.childMarkdownRemark) {
          return false;
        }
        return true;
      });

    files.forEach((node, index) => {
      if (!node.absolutePath.includes('index.md')) return;
      section.children.push({
        index: index,
        title: node.childMarkdownRemark.frontmatter.title,
        node,
        folderId: getFolder(node.absolutePath),
        children: [],
        path: getMarkdownPath(folderPath, node)
      });
    });

    files.forEach((node) => {
      if (node.absolutePath.includes('index.md')) return;

      let root = false;
      let parent = section.children.find(
        (c) => c.folderId === getFolder(node.absolutePath)
      );

      if (!parent) {
        root = true;
        parent = section;
      }

      parent.children.push({
        root: root,
        title: node.childMarkdownRemark.frontmatter.title,
        node,
        path: getMarkdownPath(folderPath, node, root)
      });
    });

    (section.children || []).forEach((section) => {
      if (section.children && section.children.length) {
        section.path = section.children[0].path;
      }
      (section.children || []).sort((a, b) => {
        if (a.node.absolutePath < b.node.absolutePath) return -1;
        if (a.node.absolutePath > b.node.absolutePath) return 1;
        return 0;
      });
    });

    section.children.sort((a, b) => {
      if (!a.root) {
        if (a.folderId < b.folderId) return -1;
        if (a.folderId > b.folderId) return 1;
      } else {
        if (a.node.absolutePath < b.node.absolutePath) return -1;
        if (a.node.absolutePath > b.node.absolutePath) return 1;
      }
      return 0;
    });

    return section;
  });
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const nav = [];
  const promises = [];

  await getMenuSection(graphql, {
    title: 'SDKs',
    path: '/sdks/',
    folderName: 'sdks'
  }).then((section) => {
    nav.push(section);
  });

  await getMenuSection(graphql, {
    title: 'Guides',
    path: '/guides/',
    folderName: 'guides'
  }).then((section) => {
    nav.push(section);
  });

  await getMenuSection(graphql, {
    title: 'API Documentation',
    path: '/apis/',
    folderName: 'apis'
  }).then((section) => {
    [
      { name: 'Ingress Api', id: 'ingress' },
      { name: 'Sense Api', id: 'sense-api' }
    ].forEach((node) => {
      section.children.push({
        component: path.resolve(`./src/templates/api.js`),
        title: node.name,
        node: node,
        children: [],
        path: `/apis/${node.id}`
      });
    });

    nav.push(section);
  });

  nav.forEach((section) => {
    section.children.forEach((c) => {
      createGuidePages(c, createPage, { nav });
    });
  });
};
