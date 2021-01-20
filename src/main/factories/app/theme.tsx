import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from './create-theme';

const ThemeFactory: React.FC = ({ children }) => {
  return <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>;
};

export default ThemeFactory;
