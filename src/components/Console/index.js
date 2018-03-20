import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Item from './Item';

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  padding: 64px 2em 2em 2em;
  width: 20%;
  overflow: auto;
  right: 0;

  @media ${props => props.theme.mobile} {
    display: none;
  }
`;

const List = styled.ul`
  padding: 2rem 0;
  display: block;
  color: #666;
  font-size: 0.875rem;
  list-style: none;
`;

@inject('requests')
@observer
class Console extends React.Component {
  render() {
    const { items } = this.props.requests;
    return (
      <Wrapper>
        <List>
          {
            items.map(item => <Item key={item.id} request={item} />)
          }
        </List>
      </Wrapper>
    );
  }
}

export default Console;
