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
            <title>Sixgill Sense IoT Developer Documentation</title>
            <meta
              name="description"
              content="Sixgill Sense for Developers: Deploy, collaborate, and iterate quickly, easily and flexibly with one backbone system for your sensor data dependent IoT applications."
            />
            <script src="https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js">
              {' '}
            </script>
          </Helmet>
          <Header currentPath={location.pathname} fixed />
          <redoc
            scroll-y-offset={114}
            spec-url={id === 'ingress' ? '/ingress.json' : '/sense-api.json'}
          />
        </div>
      </Theme>
    );
  }
}

export default Api;
