    import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
    import Dashboard from "./components/Dashboard";
    import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
    import Home from "./pages/Home"
    import Device from "./pages/Device"
    import Graph from "./pages/Graph";
export default function App() {
  return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/device" component={Device} />
              <Route exact path="/graph" component={Graph} />
              <Redirect to="notfound" />
          </Switch>
      </BrowserRouter>
  );
}
