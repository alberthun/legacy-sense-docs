import React from "react";
import Link from "gatsby-link";
import classnames from "classnames";
import styled from "styled-components";

const Logo = styled.h1`
  font-size: 1.5em;
  margin: 0;
  line-height: 1em;
  font-family: color: ${props => props.theme.monospace};
  font-weight: 400;
  color: ${props => props.theme.colors.primary};

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

const Header = styled.header`
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-bottom: 1px solid #f0f0f0;
  position: ${props => (props.fixed ? "fixed" : "relative")};
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
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const Offset = ({ fixed, children }) =>
  (fixed ? (
    <div>
      {children}
      <div style={{ height: "68px" }} />
    </div>
  ) : (
    children
  ));

export default ({ currentPath, fixed, nav }) => (
  <Offset fixed={fixed}>
    <Header fixed={fixed}>
      <Logo>
        <Link to="/">&lt;docs.sixgill&gt;</Link>
      </Logo>
      {!nav ? (
        <ul>
          <li>
            <Link
              className={classnames({
                active: currentPath === "/guides/getting-started"
              })}
              to="/guides/getting-started/overview"
            >
              Getting started
            </Link>
          </li>
          <li>
            <Link
              className={classnames({
                active:
                  currentPath.startsWith("/api") &&
                  currentPath !== "/apis/overview"
              })}
              to="/apis/overview"
            >
              API Docs
            </Link>
          </li>
          <li>
            <a href="/support">Support</a>
          </li>
        </ul>
      ) : (
        nav
      )}
    </Header>
  </Offset>
);
