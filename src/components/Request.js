import React from 'react';
import parseCurl from 'parse-curl';
import { observer, inject } from 'mobx-react';

@inject('requests')
@observer
export default class Counter extends React.Component {
  request = () => {
    const data = this.props.children.map(c => {
      if (c.props && c.props.href) {
        return c.props.href;
      }
      return c;
    });
    this.props.requests.add(parseCurl(data.join(' ')));
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
