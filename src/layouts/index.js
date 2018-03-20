import React from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import '../styles.css';

const theme = {
  monospace: '\'Source Code Pro\', monospace',
  tablet: 'only screen and (max-width: 800px)',
  mobile: 'only screen and (max-width: 650px)',
  colors: {
    primary: '#002966',
    text: '#1a1a1a',
  },
};

const DefaultLayout = ({ children }) => (
  <div>
    <Helmet title="Docs Sixgill" />
    <ThemeProvider theme={theme}>{children()}</ThemeProvider>
  </div>
);

export default DefaultLayout;
