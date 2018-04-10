const path = require("path");
const fs = require("fs");

const fromJson = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};

module.exports = {
  siteMetadata: {
    title: "Docs Sixgill",
    description: "Sixgill documentation.",
    siteUrl: "https://docs.sixgill.com/"
  },
  plugins: [
    {
      resolve: `gatsby-source-openapi-aggregate`,
      options: {
        specs: [
          {
            name: "sense-api",
            resolve: () =>
              fromJson(path.resolve(__dirname, "./swagger/sense-api.json"))
          },
          {
            name: "ingress",
            resolve: () =>
              fromJson(path.resolve(__dirname, "./swagger/ingress.json"))
          }
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/guides`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/apis`,
        name: "apis-pages"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-copy-linked-files",
          {
            resolve: "live-example",
            options: {
              "curl request": "request"
            }
          },
          {
            resolve: "gatsby-remark-images"
          }
        ]
      }
    },
    "gatsby-plugin-styled-components",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet"
  ]
};
