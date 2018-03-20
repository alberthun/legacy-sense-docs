import React from 'react';
import parseCurl from 'parse-curl';

export default class Counter extends React.Component {
  request = () => {
    const curlOptions = parseCurl(this.props.children.join(' '));
    // console.log(curlOptions);
  }

  render() {
    return (
      <code>
        {this.props.children}
        <button onClick={this.request}>Execute</button>
      </code>
    );
  }
}
