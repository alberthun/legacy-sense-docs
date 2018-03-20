
module.exports = {
  mutateSource: ({ markdownNode }, { plugins, ...options }) => {
    Object.keys(options).forEach((key) => {
      const regex = /```curl request*\n([\s\S]*?\n)```/igm;
      markdownNode.internal.content = markdownNode.internal.content.replace(regex, (match, p1) => { //eslint-disable-line
        const tag = options[key];
        return `<${tag}>${p1}</${tag}>`;
      });
    });
    return Promise.resolve();
  }
};
