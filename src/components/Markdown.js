import React from 'react';
import remark from 'remark';
import reactRenderer from 'remark-react';

const Markdown = ({ markdown }) => (
  <div>
    {
      remark()
        .use(reactRenderer)
        .processSync(markdown).contents
    }
  </div>
);


export default Markdown;
