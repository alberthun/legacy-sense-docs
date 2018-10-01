import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import '../styles.css';

const DefaultLayout = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default DefaultLayout;
