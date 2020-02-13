import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Dashboard, Layout, NotFound, TvMaze } from './views';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/"><Layout content={<Dashboard />} /></Route>
      <Route exact path="/dashboard"><Layout content={<Dashboard />} /></Route>
      <Route exact path="/tv-maze"><Layout content={<TvMaze />} /></Route>
      <Route exact path="/not-found"><Layout content={<NotFound />} /></Route>
      <Redirect to="not-found" />
    </Switch>
  </Router>
);

export default Routes;
