module.exports = {
  siteMetadata: {
    title: 'Docs Sixgill',
    description: 'Sixgill documentation.',
    siteUrl: 'https://docs.sixgill.com/'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/guides`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false
            }
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: -100
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              // maxWidth: 800
              maxWidth: 1200
            }
          }
        ]
      }
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet'
  ]
};
