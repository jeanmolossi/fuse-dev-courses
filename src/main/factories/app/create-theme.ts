import { createMuiTheme, Theme } from '@material-ui/core';
import colors from '@/presentation/styles/colors.scss';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    fuse: Palette['primary'];
  }
  interface PaletteOptions {
    fuse: PaletteOptions['primary'];
  }
}

export function createTheme(): Theme {
  return createMuiTheme({
    palette: {
      fuse: {
        50: colors.$fuseDark50,
        100: colors.$fuseDark100,
        200: colors.$fuseDark200,
        300: colors.$fuseDark300,
        400: colors.$fuseDark400,
        500: colors.$fuseDark500,
        600: colors.$fuseDark600,
        700: colors.$fuseDark700,
        800: colors.$fuseDark800,
        900: colors.$fuseDark900,
        A100: colors.$fuseDarkA100,
        A200: colors.$fuseDarkA200,
        A400: colors.$fuseDarkA400,
        A700: colors.$fuseDarkA700,
      },
      primary: {
        main: colors.$paletePrimaryMain,
        dark: colors.$paletePrimaryDark,
        light: colors.$palettePrimaryLight,
      },
      secondary: {
        main: colors.$paletteSecondaryMain,
        dark: colors.$paletteSecondaryDark,
        contrastText: colors.$paletteSecondaryContrastText,
      },
      background: {
        paper: colors.$paleteBackgroundPaper,
        default: colors.$paleteBackgroundDefault,
      },
      divider: colors.$paletteDivider,
      error: {
        50: colors.$paletteErrorRed50,
        100: colors.$paletteErrorRed100,
        200: colors.$paletteErrorRed200,
        300: colors.$paletteErrorRed300,
        400: colors.$paletteErrorRed400,
        500: colors.$paletteErrorRed500,
        600: colors.$paletteErrorRed600,
        700: colors.$paletteErrorRed700,
        800: colors.$paletteErrorRed800,
        900: colors.$paletteErrorRed900,
        A100: colors.$paletteErrorRedA100,
        A200: colors.$paletteErrorRedA200,
        A400: colors.$paletteErrorRedA400,
        A700: colors.$paletteErrorRedA700,
      },
      warning: {
        main: colors.$paletteStatusDanger,
      },
    },
  });
}
