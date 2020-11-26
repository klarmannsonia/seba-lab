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

// react toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// error interceptor
import "./services/interceptor";

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
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
