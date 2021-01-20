import { Theme } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    fuse?: Palette['primary'];
  }
  interface PaletteOptions {
    fuse?: PaletteOptions['primary'];
  }
}

const colors = {
  $fuseDark50: '#e3e6e8',
  $fuseDark100: '#bac0c5',
  $fuseDark200: '#8c969f',
  $fuseDark300: '#5e6c78',
  $fuseDark400: '#3c4d5b',
  $fuseDark500: '#192d3e',
  $fuseDark600: '#162838',
  $fuseDark700: '#122230',
  $fuseDark800: '#0e1c28',
  $fuseDark900: '#08111b',
  $fuseDarkA100: '#5b9aff',
  $fuseDarkA200: '#287bff',
  $fuseDarkA400: '#005ef4',
  $fuseDarkA700: '#0054da',

  $paletteTypeDark: 'true',
  $paletteTypeLight: 'false',
  $palettePrimaryLight: '#bcc8cd',
  $palettePrimaryMain: '#204657',
  $palettePrimaryDark: '#0b202c',
  $paletteSecondaryLight: '#b3ebc5',
  $paletteSecondaryMain: '#00bd3e',
  $paletteSecondaryDark: '#00981b',
  $paletteSecondaryContrastText: '#ffffff',
  $paletteSecondaryWhiteOpacity: '#ffffff23',
  $paletteBackgroundPaper: '#1c1e27',
  $paletteBackgroundDefault: '#15171e',
  $paletteDivider: '#15171e',

  $paletteErrorRed50: '#ffebee',
  $paletteErrorRed100: '#ffcdd2',
  $paletteErrorRed200: '#ef9a9a',
  $paletteErrorRed300: '#e57373',
  $paletteErrorRed400: '#ef5350',
  $paletteErrorRed500: '#f44336',
  $paletteErrorRed600: '#e53935',
  $paletteErrorRed700: '#d32f2f',
  $paletteErrorRed800: '#c62828',
  $paletteErrorRed900: '#b71c1c',
  $paletteErrorRedA100: '#ff8a80',
  $paletteErrorRedA200: '#ff5252',
  $paletteErrorRedA400: '#ff1744',
  $paletteErrorRedA700: '#d50000',
};

export function createTheme(): Theme {
  return createMuiTheme({
    transitions: {
      duration: {
        enteringScreen: 300,
        leavingScreen: 200,
        standard: 300,
      },
    },
    palette: {
      fuse: {
        main: colors.$fuseDark500,
        '50': colors.$fuseDark50,
        '100': colors.$fuseDark100,
        '200': colors.$fuseDark200,
        '300': colors.$fuseDark300,
        '400': colors.$fuseDark400,
        '500': colors.$fuseDark500,
        '600': colors.$fuseDark600,
        '700': colors.$fuseDark700,
        '800': colors.$fuseDark800,
        '900': colors.$fuseDark900,
        A100: colors.$fuseDarkA100,
        A200: colors.$fuseDarkA200,
        A400: colors.$fuseDarkA400,
        A700: colors.$fuseDarkA700,
      },
      primary: {
        dark: colors.$palettePrimaryDark,
        light: colors.$palettePrimaryLight,
        main: colors.$palettePrimaryMain,
        '50': colors.$fuseDark50,
        '100': colors.$fuseDark100,
        '200': colors.$fuseDark200,
        '300': colors.$fuseDark300,
        '400': colors.$fuseDark400,
        '500': colors.$fuseDark500,
        '600': colors.$fuseDark600,
        '700': colors.$fuseDark700,
        '800': colors.$fuseDark800,
        '900': colors.$fuseDark900,
        A100: colors.$fuseDarkA100,
        A200: colors.$fuseDarkA200,
        A400: colors.$fuseDarkA400,
        A700: colors.$fuseDarkA700,
      },
      secondary: {
        main: colors.$paletteSecondaryMain,
        dark: colors.$paletteSecondaryDark,
        contrastText: colors.$paletteSecondaryContrastText,
      },
      background: {
        paper: colors.$paletteBackgroundPaper,
        default: colors.$paletteBackgroundDefault,
      },
      divider: colors.$paletteDivider,
      error: {
        main: colors.$paletteErrorRed500,
        '50': colors.$paletteErrorRed50,
        '100': colors.$paletteErrorRed100,
        '200': colors.$paletteErrorRed200,
        '300': colors.$paletteErrorRed300,
        '400': colors.$paletteErrorRed400,
        '500': colors.$paletteErrorRed500,
        '600': colors.$paletteErrorRed600,
        '700': colors.$paletteErrorRed700,
        '800': colors.$paletteErrorRed800,
        '900': colors.$paletteErrorRed900,
        A100: colors.$paletteErrorRedA100,
        A200: colors.$paletteErrorRedA200,
        A400: colors.$paletteErrorRedA400,
        A700: colors.$paletteErrorRedA700,
      },
    },
  });
}
