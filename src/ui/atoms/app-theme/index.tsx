import React from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      marginBottom: "0.5rem"    
    }
  },
});

export const AppTheme : React.FC = (props) => {
  return (
    <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
  )
}