import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { createContext } from 'react';

const ThemeContext = createContext(true);


//Theme set-up
declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    nuetral: Palette['primary'];
  }
  interface PaletteOptions {
    nuetral: PaletteOptions['primary'];
  }
}


const dark = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#FFFFFF',
      },
      secondary: {
        main: '#6669A8',
      },
      error: {
        main: red.A400,
      },
      nuetral: {
        main: '#F2F4F2',
      },
      background: {
        default: '#004D60',
        paper: '#002E42',
      },
    
    },
  });

const light = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#004D60',
        },
        secondary: {
          main: '#6E6E6E',
        },
        error: {
          main: red.A400,
        },
        nuetral: {
          main: '#BCBCBA',
        },
        background: {
          default: '#FFF',
          paper: '#F5F5F5',
        },
    },
});

export const darkTheme = { ...dark }
export const lightTheme = { ...light }

export default ThemeContext;
