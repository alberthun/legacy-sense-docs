import React from 'react';

class Redirect extends React.Component {
  componentDidMount() {
    window.location.href = this.props.to;
  }
  render() {
    return <div />;
  }
}

export default Redirect;
