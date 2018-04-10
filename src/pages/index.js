import React, { Component } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";

const Hero = styled.div`
  z-index: 1;
  background-image: linear-gradient(
    120deg,
    ${props => props.theme.colors.primary} 0%,
    #002966 100%
  );
  color: #fff;
  padding: 70px;
  border-radius: 0 0 50% 50% / 4%;
  display: flex;
  justify-content: space-between;

  section:first-child {
    width: 50%;
    margin-left: 3%;
  }

  section:last-child {
    width: 45%;
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

  @media ${props => props.theme.tablet} {
    padding: 50px 15px;
    flex-direction: column;

    h2 {
      font-size: 2.5em;
    }

    h3 {
      font-size: 1.25em;
    }

    section:first-child,
    section:last-child {
      width: 100%;
    }

    section:first-child {
      margin: 0 0 2em 0;
    }
  }
`;

const Philosophy = styled.section`
  background: #f9f8f9;
  display: flex;
  justify-content: space-around;
  margin-top: -2em;
  padding: 5em 2em 2em 2em;

  div {
    width: 30%;
  }

  h3 {
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin-top: 0;
  }

  @media ${props => props.theme.tablet} {
    flex-direction: column;

    div {
      width: 90%;
      margin: auto;
    }
  }
`;

class IndexPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Header currentPath={this.props.location.pathname} fixed />
        <Hero>
          <section>
            <h2>Sixgill</h2>
            <h3>
              We are a backbone for governance of the Internet of Everything.
              Sixgill enables the governance of connected assets—people, places
              and things—with our universal sensor data services platform for
              easier, faster, and more flexible IoE application development. We
              unlock the value of IoE by taking noisy, voluminous data and
              identifying exception events—the valuable data intersections that
              are pertinent to business problems that our customers care about
              in the moment.
            </h3>
            <Button to="/guides/getting-started/overview" large>
              Get Started
            </Button>
            <Button to="/apis/overview" large transparent>
              API Docs
            </Button>
          </section>
        </Hero>
        <Philosophy>
          <div>
            <h3>Sixgill Sense: How it Works</h3>
            <p>
              Sense features and benefits provide a unique combination of
              technology, services and capacity-maximizing capabilities. With
              continuous sensor data collection and real-time understanding,
              Sense helps enterprises know what assets are available, where they
              are and their operating state while keeping behaviors and actions
              on track.
            </p>
          </div>
          <div>
            <h3>Sense 2.0 Product Brief</h3>
            <p>
              Sense features and benefits provide a unique combination of
              technology, services and capacity-maximizing capabilities. With
              continuous sensor data collection and real-time understanding,
              Sense helps enterprises know what assets are available, where they
              are and their operating state while keeping behaviors and actions
              on track.
            </p>
          </div>
          <div>
            <h3>Sense 2.0 Architecture White Paper</h3>
            <p>
              Sense solves fragmentation and integration problems with a common,
              cross-enterprise architecture unbounded for scale and unrestricted
              for extensibility and deployment. Sense fits within the
              infrastructure of any enterprise for development of a wide range
              of task-specific applications for sensor-equipped assets.
            </p>
          </div>
        </Philosophy>
        <Footer />
      </div>
    );
  }
}

export default IndexPage;
