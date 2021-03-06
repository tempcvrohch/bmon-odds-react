import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { RootStoreProvider } from "./Stores";
import Toast from "./Components/Router/Toast";
import UserAppBar from "./Components/Router/UserAppBar";
import Navigator from "./Components/Router/Navigator";

import Home from './Routes/Home'
import Match from './Routes/Match'
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import Bets from "./Routes/Bets";

import "./Router.css"

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2C4770' },
    secondary: { main: '#246C60' },
  },
  typography: { useNextVariants: true },
});

export default function AppRouter() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <RootStoreProvider>
          <div className="bg1"></div>
          <div className="bg2"></div>
          <div className="root">
            <CssBaseline />
            <Toast />
            <Navigator />
            <main className="main">
              <UserAppBar/>
              <Route path="/" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/match/:id" component={Match} />
              <Route path="/bets" component={Bets} />
            </main>
          </div>
        </RootStoreProvider>
      </MuiThemeProvider>
    </Router>
  )
}
