import Link from 'gatsby-link';
import styled from 'styled-components';

const Button = styled(Link)`
  text-decoration: none;
  background: ${props => (props.transparent ? 'transparent' : '#5cc468')};
  color: ${props =>
    (props.transparent ? 'inherit' : 'white')};
  border: 2px solid #5cc468;
  padding: 0.44em 1.2em;
  display: inline-block;
  margin: 0 0.25em;
  transition: all 0.25s;
  cursor: pointer;
  font-weight: bold;
  font-size: ${props => (props.large ? '1.15rem' : '1rem')};

  &:hover {
    transform: translateY(-2px);
     color: ${props =>
    (props.transparent ? 'inherit' : 'white')};
  }
`;

export default Button;
