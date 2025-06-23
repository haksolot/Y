import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import AppRouter from "./routes/AppRouter";
import ThemeSwitch from "./layouts/ThemeSwitch";

function App() {
  return (
    <ThemeProvider>
      <ThemeSwitch />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
