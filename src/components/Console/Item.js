
import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Spinner from '../Spinner';

@observer
class Item extends React.Component {
  render() {
    const {
      state,
      method,
      url,
      response,
      httpCode
    } = this.props.request;


    return (
      <div>
        {method} {url}
        <br />
        { state === 'pending' && <Spinner /> }
        {
          state === 'resolved' &&
          <div>
            HttpCode: {httpCode}
            <br />
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        }
      </div>
    );
  }
}

export default Item;