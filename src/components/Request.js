import React from 'react';
import parseCurl from 'parse-curl';
import { observer, inject } from 'mobx-react';

@inject('requests')
@observer
export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    const data = props.children.map(c => {
      if (c.props && c.props.href) {
        return c.props.href;
      }
      return c;
    });
    this.state = {
      ...parseCurl(data.join(' '))
    };
  }

  request = () => {
    this.props.requests.add(this.state);
  }

  render() {
    return (
      <div>
        <code>{this.props.children }</code>
        <div>
          <button onClick={this.copy}>Copy</button>
        </div>
      </div>
    );
  }
}
