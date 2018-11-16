import React from 'react';
import Link from 'gatsby-link';
import classnames from 'classnames';
import styled from 'styled-components';

import SixgillLogo from '../../static/sixgill-logo.svg';

const Logo = styled.h1`
  font-size: 1.5em;
  margin: 0;
  line-height: 1em;
  font-family: color: ${(props) => props.theme.monospace};
  font-weight: 400;
  color: ${(props) => props.theme.colors.primary};

  a {
    color: inherit;
    text-decoration: inherit;

    &:hover {
      color: inherit;
    }
  }
`;

const Header = styled.header`
  // border-top: 3px solid ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid #f0f0f0;
  position: ${(props) => (props.fixed ? 'fixed' : 'relative')};
  top: 0;
  left: 0;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.25em 2em;
  z-index: 99;
  height: auto;

  @media (max-width: 414px) {
    flex-direction: column;
    padding: 1em 2em;

    h1 {
      display: flex;
      flex: 1;
    }

    img {
      height: 50px !important;
    }

    h5 {
      font-size: 0.875em !important;
      margin: 2px 0 0 30px !important;
    }

    ul {
      display: flex;
      flex: 1;
      margin-top: 8px !important;
      align-self: start;
    }

    li:first-child {
      margin-left: 0;
    }
  }

  ul {
    padding: 0;
    list-style: none;
    margin: 0;
  }

  li {
    display: inline-block;
    margin: 0 0.5em;
  }

  a {
    color: inherit;
    font-weight: inherit;
    text-decoration: none;
  }

  .active {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const Offset = ({ fixed, children }) =>
  fixed ? (
    <div>
      {children}
      <div style={{ height: '114px' }} />
    </div>
  ) : (
    children
  );

export default ({ currentPath, fixed, nav }) => (
  <Offset fixed={fixed}>
    <Header className="topNav" fixed={fixed}>
      <Logo>
        <Link to="/">
          <img
            src={SixgillLogo}
            alt="Sixgill Logo"
            style={{ height: '70px' }}
          />
        </Link>
        <h5
          style={{
            display: 'inline-block',
            margin: '27px 0 0 30px',
            fontWeight: 'bold',
            verticalAlign: 'top'
          }}
        >
          <a href="/">Developer Documentation</a>
        </h5>
      </Logo>
      {!nav ? (
        <ul>
          <li>
            <Link
              className={classnames({
                active: currentPath === '/guides/getting-started'
              })}
              to="/guides/getting-started"
            >
              Get Started
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link
              className={classnames({
                active:
                  currentPath.startsWith('/api') && currentPath !== '/apis'
              })}
              to="/apis"
            >
              API Docs
            </Link>
          </li>
        </ul>
      ) : (
        nav
      )}
    </Header>
  </Offset>
);
