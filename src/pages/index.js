import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

import Theme from '../components/Theme';

import SenseLogo from '../../static/sixgill-sense-logo-inverted.svg';
import IconAdminTools from '../../static/admin-tools.svg';
import IconExtensiblePlatform from '../../static/extensible-platform.svg';
import IconRealTime from '../../static/real-time.svg';
import IconSaasApplications from '../../static/saas-applications.svg';
import IconSecurity from '../../static/security.svg';
import IconSensorIngestion from '../../static/sensor-ingestion.svg';

const Hero = styled.div`
  z-index: 1;
  background-image: linear-gradient(
    120deg,
    ${(props) => props.theme.colors.primary} 0%,
    #002966 100%
  );
  color: #fff;
  padding: 30px 40px 30px 40px;
  display: flex;
  justify-content: space-between;

  section:first-child {
    width: 50%;
    margin-left: 3%;
  }

  section:last-child {
    width: 45%;
  }

  section.left-section {
    padding-right: 50px;
    border-right: 1px solid #5cc468;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  section.right-section {
    margin-top: 40px;
    margin-bottom: 40px;
    padding-left: 40px;
    padding-right: 40px;
  }

  h2 {
    margin-top: 1.5rem;
    font-size: 3.5em;
    margin-bottom: 0.25em;
    font-weight: bold;
    letter-spacing: 1.5px;
    line-height: 1.05em;
    display: inline-block;
  }

  h3 {
    font-size: 1.5em;
    margin-top: 0;
    margin-bottom: 1.5em;
    font-weight: 300;
  }

  @media ${(props) => props.theme.tablet} {
    padding: 30px 40px 30px 40px;
    flex-direction: column;

    h2 {
      font-size: 2.5em;
    }

    h3 {
      font-size: 1.25em;
    }

    section.left-section {
      margin-top: 20px;
      padding-left: 10px;
      padding-right: 10px;
      border-right: 0;
      padding-bottom: 30px;
      border-bottom: 1px solid #5cc468;
      width: 95%;
    }

    section.right-section {
      margin-top: 0;
      padding-left: 10px;
      padding-right: 10px;
      margin-bottom: 0;
      width: 95%;
    }
  }

  @media (max-width: 414px) {
    section.left-section {
      margin-top: 0px;
      padding-left: 10px;
      padding-right: 10px;
      border-right: 0;
      padding-bottom: 30px;
      border-bottom: 1px solid #5cc468;
    }

    section.right-section {
      margin-top: 0;
      padding-left: 10px;
      padding-right: 10px;
      margin-bottom: 0;
    }
  }
`;

const Philosophy = styled.section`
  background: #f9f8f9;
  display: flex;
  flex-direction: column;
  margin-top: -2em;
  padding: 5em 2em 2em 2em;

  h3 {
    color: ${(props) => props.theme.colors.primary};
  }

  p {
    margin-top: 0;
  }

  @media ${(props) => props.theme.tablet} {
    flex-direction: column;

    div {
      width: 90%;
      margin: auto;
    }
  }

  .row-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
  }

  .one-third {
    display: flex;
    flex-direction: column;
    width: 30%;
  }

  @media (max-width: 414px) {
    .row-wrap {
      flex-direction: column;
    }

    .one-third {
      width: 90%;
      margin-top: 20px;
    }
  }
`;

const LinkButton = styled.a`
  background: #5cc468;
  padding: 0.8em 1.2em;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  align-self: center;
  width: 200px;
  flex-grow: 0;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    color: #fff;
  }
`;

class IndexPage extends Component {
  componentDidMount() {
    console.log('hello');
  }

  render() {
    return (
      <Theme>
        <div>
          <Helmet>
            <title>Sixgill Sense IoT Developer Documentation</title>
            <meta
              name="description"
              content="Sixgill Sense for Developers: Deploy, collaborate, and iterate quickly, easily and flexibly with one backbone system for your sensor data dependent IoT applications."
            />
          </Helmet>
          <div>
            <Header currentPath={this.props.location.pathname} fixed />
            <Hero>
              <section className="left-section">
                <img
                  src={SenseLogo}
                  alt="Sixgill Sense Logo"
                  style={{ height: '70px', margin: '0 0 10px 0' }}
                />
                <h3>
                  <b>The Sensor Data Destination</b>
                </h3>
                <p>
                  Sixgill Sense enables developers to quickly and easily acquire
                  sensor data in any volume and velocity, understand it, and act
                  on it programmatically. Sense universally supports the data
                  service requirements of any sensor-dependent application.
                </p>
                <p>It’s your sensor data destination.</p>
              </section>
              <section className="right-section">
                <h4>
                  <b>Sixgill Sense for Developers</b>
                </h4>
                <p>
                  Deploy, collaborate, and iterate with one backbone system that
                  puts you and your IoT development needs first.
                </p>
                <p>
                  <ul>
                    <li>Fast, easy device setup and connection</li>
                    <li>
                      Full-featured portal with anywhere, anytime debugging
                      mobile application
                    </li>
                    <li>
                      Highly visual dashboard for real-time analytics,
                      administration and monitoring
                    </li>
                    <li>
                      Built-in geofencing and highly visual process for rules
                      assignment and triggered actions
                    </li>
                  </ul>
                </p>
                <p style={{ textAlign: 'center', marginTop: '30px' }}>
                  <Button
                    style={{ marginBottom: '10px' }}
                    to="/guides/getting-started"
                  >
                    Get Started
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button to="/apis" transparent>
                    API Docs
                  </Button>
                </p>
              </section>
            </Hero>
            <Philosophy>
              <div>
                <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>
                  Sixgill Sense Platform Is Purpose-Built For Fast, Easy, and
                  Flexible IoT Application Development
                </h2>
                <br />
              </div>
              <div className="row-wrap">
                <div className="one-third">
                  <img
                    src={IconSaasApplications}
                    alt="Icon SaaS Applications"
                    style={{
                      width: '100px',
                      height: '100px',
                      margin: '0 auto'
                    }}
                  />
                  <h5>RAPIDLY DEPLOY SENSOR-INFORMED APPLICATIONS</h5>
                </div>
                <div className="one-third">
                  <img
                    src={IconSensorIngestion}
                    alt="Icon Sensor Ingestion"
                    style={{
                      width: '100px',
                      height: '100px',
                      margin: '0 auto'
                    }}
                  />
                  <h5>AGGREGATE DEVICE AND SENSOR DATA</h5>
                </div>
                <div className="one-third">
                  <img
                    src={IconRealTime}
                    alt="Icon Real Time"
                    style={{
                      width: '100px',
                      height: '100px',
                      margin: '0 auto'
                    }}
                  />
                  <h5>REAL-TIME ACTION BASED ON CUSTOMIZABLE RULES</h5>
                </div>
              </div>
              <div className="row-wrap">
                <div className="one-third">
                  <img
                    src={IconExtensiblePlatform}
                    alt="Icon Extensible Platform"
                    style={{
                      width: '100px',
                      height: '100px',
                      margin: '0 auto'
                    }}
                  />
                  <h5>EXTENSIBLE PLATFORM THROUGH CUSTOM PLUGINS</h5>
                </div>
                <div className="one-third">
                  <img
                    src={IconAdminTools}
                    alt="Icon Admin Tools"
                    style={{
                      width: '100px',
                      height: '100px',
                      margin: '0 auto'
                    }}
                  />
                  <h5>SYSTEM ADMINISTRATION AND MONITORING TOOLS</h5>
                </div>
                <div className="one-third">
                  <img
                    src={IconSecurity}
                    alt="Icon Security"
                    style={{
                      width: '100px',
                      height: '100px',
                      margin: '0 auto'
                    }}
                  />
                  <h5>SECURITY</h5>
                </div>
              </div>
            </Philosophy>
            <Philosophy>
              <div style={{ borderTop: '1px solid #ddd', paddingTop: '30px' }}>
                <h2 style={{ textAlign: 'center' }}>Helpful Resources</h2>
                <br />
              </div>
              <div className="row-wrap">
                <div className="one-third">
                  <h3>Sixgill Sense: How it Works</h3>
                  <p>
                    Sense features and benefits provide a unique combination of
                    technology, services and capacity-maximizing capabilities.
                    With continuous sensor data collection and real-time
                    understanding, Sense helps enterprises know what assets are
                    available, where they are and their operating state while
                    keeping behaviors and actions on track.
                  </p>
                  <LinkButton href="https://www.sixgill.com/platform">
                    Learn More
                  </LinkButton>
                </div>
                <div className="one-third">
                  <h3>Sense 2.0 Product Brief</h3>
                  <p>
                    Sixgill Sense 2.0 is a complete IoT sensor data platform
                    solution that enables enterprise-wide unified ingestion and
                    sensor data processing for the rapid and uniform development
                    of enterprise applications. With features including a
                    massively scalable architecture, real-time rule triggers,
                    and advanced data correlation features like proximity, the
                    IoT sensor data platform produces actionable,
                    context-enriched insights for sensor and location data.
                  </p>
                  <LinkButton href="https://www.sixgill.com/sdm_downloads/sixgill-sense-2-0-product-brief">
                    Learn More
                  </LinkButton>
                </div>
                <div className="one-third">
                  <h3>Sense 2.0 Architecture White Paper</h3>
                  <p>
                    Sense solves fragmentation and integration problems with a
                    common, cross-enterprise architecture unbounded for scale
                    and unrestricted for extensibility and deployment. Sense
                    fits within the infrastructure of any enterprise for
                    development of a wide range of task-specific applications
                    for sensor-equipped assets.
                  </p>
                  <LinkButton href="https://www.sixgill.com/sdm_downloads/sixgill-sense-2-0-architecture-white-paper">
                    Learn More
                  </LinkButton>
                </div>
              </div>
            </Philosophy>
            <Philosophy>
              <div
                style={{
                  textAlign: 'center',
                  borderTop: '1px solid #ddd',
                  padding: '20px 0',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <h2>
                  Questions?
                  <br />
                  We're here to help.
                </h2>
                <br />
                <LinkButton href="mailto:developers@sixgill.com">
                  Contact us
                </LinkButton>
                <br />
              </div>
            </Philosophy>
            <Footer />
          </div>
        </div>
      </Theme>
    );
  }
}

export default IndexPage;
