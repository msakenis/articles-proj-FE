import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import getCustomThemeStyles from './themeStyles';

const theme = getCustomThemeStyles();

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
