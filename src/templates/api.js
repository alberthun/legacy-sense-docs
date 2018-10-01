import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from '../components/Header';
import Nav from '../components/Nav';

const ApiDocs = styled.main`
  float: left;
  width: 55%;
  margin-left: 20%;
  padding: 2em 4em;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0;
  }
`;

function DisableTryItOutPlugin() {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false
        }
      }
    }
  };
}

function DisableAuthorizePlugin() {
  return {
    wrapComponents: {
      authorizeBtn: () => () => null
    }
  };
}

class Api extends React.Component {
  componentDidMount() {}
  render() {
    const { location } = this.props;
    const { nav } = this.props.pageContext;

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
