module.exports = {
  siteMetadata: {
    title: 'Docs Sixgill',
    description: 'Sixgill documentation.',
    siteUrl: 'https://docs.sixgill.com/',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/guides`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'live-example',
            options: {
              'curl request': 'request'
            },
          },
          {
            resolve: 'gatsby-remark-images',
          }
        ],
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
  ],
};
