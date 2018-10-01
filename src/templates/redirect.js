import React from 'react';
import Redirect from '../components/Redirect';
class RedirectTemplate extends React.Component {
  render() {
    return <Redirect to={this.props.pathContext.to} />;
  }
}

export default RedirectTemplate;
