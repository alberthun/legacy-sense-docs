import React from 'react';
import styled from 'styled-components';

import SixgillLogoInverted from '../../static/sixgill-logo-inverted.svg';
import TwitterIcon from '../../static/twitter-icon.svg';
import LinkedInIcon from '../../static/linkedin-icon.svg';
import FacebookIcon from '../../static/facebook-icon.svg';

const Footer = styled.footer`
 background: #1a1a1a;
 color: #fff;
 padding: 1.25em 2em;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    display: flex;
  }

  @media (max-width: 414px) {
    flex-direction: column;

    .footer-logo {
      align-self: center;
      margin-bottom: 20px;
    }
  }

  .links-copyright-wrap {
    flex-direction: column;
  }
`;

const FooterLinks = styled.ul`
  margin: 10px 0 0 30px;
  padding: 0;

  li {
    list-style: none;
    display: inline-block;
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #a1a1a1;

    &:last-child {
      border-right: 0;
    }
  }

  a {
    color: #4DDB5A;
    text-decoration: none;

    &:hover {
      color: #4DDB5A;
      text-decoration: underline;
    }
  }

  @media (max-width: 414px) {
    text-align: center;
    margin-left: 0;
    margin-bottom: 10px;

    li {
      border-right: 0;
      margin-left: 20px;
      margin-top: 10px;
      padding: 0 !important;
    }
  }
`;

const CopyrightNotice = styled.div`
  margin: 15px 0 0 30px;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }

  @media (max-width: 414px) {
    text-align: center;
    margin-left: 0;
    margin-bottom: 20px;
    font-size: 0.875em;
  }
`;

const SocialIcons = styled.div`
  flex: 1;
  text-align: right;
  align-self: flex-end;
  justify-self: flex-end;
  margin-bottom: 5px;

  @media (max-width: 414px) {}
    align-self: center;
`;

export default () => (
  <Footer>
    <Content>
      <div className="footer-logo">
        <img
          src={SixgillLogoInverted}
          alt="Sixgill Logo"
          style={{ height: '70px' }}
        />
      </div>
      <div className="links-copyright-wrap">
        <div>
          <FooterLinks>
            <li>
              <a href="https://www.sixgill.com">Home</a>
            </li>
            <li>
              <a href="https://www.sixgill.com/platform">Platform</a>
            </li>
            <li>
              <a href="https://www.sixgill.com/solutions">Solutions</a>
            </li>
            <li>
              <a href="https://www.sixgill.com/company">Company</a>
            </li>
            <li>
              <a href="https://www.sixgill.com/developers">Developers</a>
            </li>
            <li>
              <a href="https://www.sixgill.com/resources">Resources</a>
            </li>
            <li>
              <a href="https://www.sixgill.com/blog">Blog</a>
            </li>
            <li>
              <a href="https://www.sixgill.com/contacts">Contact</a>
            </li>
          </FooterLinks>
        </div>
        <CopyrightNotice>
          © Copyright Sixgill, LLC. All Rights Reserved.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://www.sixgill.com/legal">Legal</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://www.sixgill.com/press/">Press</a>
        </CopyrightNotice>
      </div>
      <SocialIcons>
        <a style={{ marginRight: '20px' }} href="https://twitter.com/SixgillTech">
          <img
            src={TwitterIcon}
            alt="Twitter"
            style={{ height: '20px' }}
          />
        </a>
        &nbsp;
        <a style={{ marginRight: '20px' }} href="https://www.facebook.com/sixgilltech/?fref=ts">
          <img
          src={FacebookIcon}
          alt="Facebook"
          style={{ height: '20px' }}
          />
        </a>
        &nbsp;
        <a href="https://www.linkedin.com/company/sixgill-llc">
          <img
          src={LinkedInIcon}
          alt="LinkedIn"
          style={{ height: '20px' }}
          />
        </a>
      </SocialIcons>
    </Content>
  </Footer>
);
