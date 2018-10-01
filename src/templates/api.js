import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from '../components/Header';
import Theme from '../components/Theme';

class Api extends React.Component {
  componentDidMount() {}
  render() {
    const { location } = this.props;
    const { id } = this.props.pageContext;

    return (
      <Theme>
        <div>
          <Helmet>
            <title>&middot; Sixgill</title>
            <script src="https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js">
              {' '}
            </script>
          </Helmet>
          <Header currentPath={location.pathname} fixed />
          <redoc
            spec-url={id === 'ingress' ? '/ingress.json' : '/sense-api.json'}
          />
        </div>
      </Theme>
    );
  }
}

export default Api;
