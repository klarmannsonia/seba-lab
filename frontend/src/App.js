import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

// material ui
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import {
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
  Switch,
} from "@material-ui/core";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
          <main>
            <Container>
              <Route path="/login" component={LoginScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/" component={HomeScreen} exact />
            </Container>
          </main>
          <Footer />
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
