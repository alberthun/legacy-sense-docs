import React from 'react';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import Theme from '../components/Theme';

class Api extends React.Component {
  componentDidMount() {
    const { id } = this.props.pageContext;
    const url = id === 'ingress' ? '/ingress.json' : '/sense-api.json';
    const interval = setInterval(() => {
      if (window.Redoc) {
        clearInterval(interval);
      }
      window.Redoc.init(
        url,
        {
          scrollYOffset: 114
        },
        document.getElementById('redoc'),
        (er) => {
          console.log(er);
        }
      );
    }, 100);
  }
  render() {
    const { location } = this.props;
    const { name } = this.props.pageContext.page;

    return (
      <Theme>
        <div>
          <Helmet>
            <title>{name} - Sixgill Sense IoT Developer Documentation</title>
            <meta
              name="description"
              content="Sixgill Sense for Developers: Deploy, collaborate, and iterate quickly, easily and flexibly with one backbone system for your sensor data dependent IoT applications."
            />
            <script src="https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js">
              {' '}
            </script>
          </Helmet>
          <Header currentPath={location.pathname} fixed />
          <div id={'redoc'} />
        </div>
      </Theme>
    );
  }
}

export default Api;
