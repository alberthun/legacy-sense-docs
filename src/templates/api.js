import React from "react";
// import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";
import SwaggerUI from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";

import Header from "../components/Header";
import Nav from "../components/Nav";

const ApiDocs = styled.main`
  float: left;
  width: 55%;
  margin-left: 20%;
  padding: 2em 4em;

  @media ${props => props.theme.mobile} {
    width: 100%;
    margin: 0;
  }
`;

const DisableTryItOutPlugin = function() {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false
        }
      }
    }
  };
};

const DisableAuthorizePlugin = function() {
  return {
    wrapComponents: {
      authorizeBtn: () => () => null
    }
  };
};

class Api extends React.Component {
  componentDidMount() {
    console.log(this.props.pathContext.page.spec);
    SwaggerUI({
      dom_id: "#ui",
      spec: JSON.parse(this.props.pathContext.page.spec),
      plugins: [DisableTryItOutPlugin, DisableAuthorizePlugin],
      defaultModelsExpandDepth: -1,
      deepLinking: true
    });
  }
  render() {
    // const api = this.props.data.openApiSpec;
    const { location } = this.props;
    const { nav } = this.props.pathContext;

    // const paths = api.childrenOpenApiSpecPath;
    /*
    const groupsByTag = {};
    paths.forEach(c => {
      groupsByTag[c.tag] = [].concat(groupsByTag[c.tag] || [], c);
    });
    */

    return (
      <div>
        <Helmet>
          <title>&middot; Sixgill </title>
        </Helmet>
        <Header currentPath={location.pathname} fixed />
        <Nav nav={nav} currentPath={location.pathname} />
        <ApiDocs>
          <div id="ui" />
        </ApiDocs>
      </div>
    );
  }
}

export default Api;
