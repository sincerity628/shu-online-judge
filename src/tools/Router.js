import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from '../pages/authentication/Signin';
import Signup from '../pages/authentication/Signup';
import Groups from '../pages/group/Groups';
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';
import Rank from '../pages/rank/Rank';
import Tests from '../pages/test/Tests';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/groups" component={Groups} />
        <Route path="/profile" component={Profile} />
        <Route path="/rank" component={Rank} />
        <Route path="/test" component={Tests} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
