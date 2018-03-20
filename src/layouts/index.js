import React from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import theme from '../theme';
import '../styles.css';
import Requests from '../stores/requests';
import Auth from '../stores/auth';

const auth = new Auth();
const requests = new Requests(auth);

const stores = {
  auth,
  requests
};

const DefaultLayout = ({ children }) => (
  <Provider {...stores}>
    <div>
      <Helmet title="Docs Sixgill" />
      <ThemeProvider theme={theme}>{children()}</ThemeProvider>
    </div>
  </Provider>
);

export default DefaultLayout;
