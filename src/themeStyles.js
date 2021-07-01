import pink from '@material-ui/core/colors/pink';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';

import {createMuiTheme} from '@material-ui/core/styles';

const getCustomThemeStyles = () => {
  const customThemeStyles = {
    palette: {
      primary: {
        light: teal[500],
        main: teal[700],
        dark: teal[900],
        contrastText: '#FFFFFF',
      },
      warning: {
        light: amber[500],
        main: amber[700],
        dark: amber[900],
        contrastText: '#FFFFFF',
      },
      error: {
        light: red[500],
        main: red[700],
        dark: red[900],
        contrastText: '#FFFFFF',
      },
      success: {
        light: green[500],
        main: green[700],
        dark: green[900],
        contrastText: '#FFFFFF',
      },
      secondary: pink,
    },
    overrides: {
      MuiBackdrop: {
        root: {},
      },
    },
  };

  return createMuiTheme(customThemeStyles);
};

export default getCustomThemeStyles;
