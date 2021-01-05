import * as React from "react";
import { CssBaseline } from "@material-ui/core";
import {AppTheme} from "./ui";
import { DocsPage } from "./docs";

import "./styles.css";

export default function App() {
  return (
    <AppTheme>
      <CssBaseline />
      <DocsPage />
    </AppTheme>
  );
}
