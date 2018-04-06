import React from "react";
// import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";
import SpecInformation from "../components/Spec/Information";
import SpecPaths from "../components/Spec/Paths";

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

class Api extends React.Component {
  render() {
    const api = this.props.data.openApiSpec;
    const { location } = this.props;
    const { nav } = this.props.pathContext;

    const paths = api.childrenOpenApiSpecPath;
    const groupsByTag = {};
    paths.forEach(c => {
      groupsByTag[c.tag] = [].concat(groupsByTag[c.tag] || [], c);
    });

    return (
      <div>
        <Helmet>
          <title>{api.title} &middot; Sixgill </title>
        </Helmet>
        <Header currentPath={location.pathname} fixed />
        <Nav nav={nav} currentPath={location.pathname} />
        <ApiDocs>
          <SpecInformation
            title={api.title}
            version={api.version}
            description={api.description}
          />
          {Object.keys(groupsByTag).map(t => (
            <SpecPaths key={t} tag={t} paths={groupsByTag[t]} />
          ))}
        </ApiDocs>
      </div>
    );
  }
}

export default Api;

export const query = graphql`
  query ApiQuery($id: String!) {
    openApiSpec(id: { eq: $id }) {
      version
      title
      description
      childrenOpenApiSpecPath {
        name
        verb
        summary
        description
        parameters {
          name
          in
          description
          required
          type
          format
        }
        tag
        childrenOpenApiSpecResponse {
          id
          statusCode
          description
          childrenOpenApiSpecDefinition {
            name
            properties {
              name
              type
              description
              format
            }
          }
        }
      }
    }
  }
`;
