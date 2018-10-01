import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from '../components/Header';
import Theme from '../components/Theme';

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
      <Theme>
        <div>
          <Helmet>
            <title>&middot; Sixgill </title>
            <script src="https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js">
              {' '}
            </script>
          </Helmet>
          <Header currentPath={location.pathname} fixed />
          <redoc spec-url="https://raw.githubusercontent.com/sixgill/sense-api-node/master/openapi.json?token=AAMcXj1yoJcyXw6oKkZAPf9G0wkl0Gljks5buw-twA%3D%3D" />
        </div>
      </Theme>
    );
  }
}

export default Api;
