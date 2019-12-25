import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AnnouncementDetail from '../pages/announcement-detail/AnnouncementDetail';
import Signin from '../pages/authentication/Signin';
import Signup from '../pages/authentication/Signup';
import Backend from '../pages/backend/Backend';
import ForgetPassword from '../pages/forget-password/ForgetPassword';
import Groups from '../pages/group/Groups';
import Home from '../pages/home/Home';
import ProblemDetail from '../pages/problem-detail/ProblemDetail';
import Profile from '../pages/profile/Profile';
import Rank from '../pages/rank/Rank';
import Setting from '../pages/setting/Setting';
import Status from '../pages/status/Status';
import Submission from '../pages/submission/Submission';
import Tests from '../pages/test/Tests';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/announcement/:id" component={AnnouncementDetail} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/backend" component={Backend} />
      <Route path="/forget-password" component={ForgetPassword} />
      <Route path="/groups" component={Groups} />
      <Route path="/problem/:id" component={ProblemDetail} />
      <Route path="/profile" component={Profile} />
      <Route path="/rank" component={Rank} />
      <Route path="/setting" component={Setting} />
      <Route path="/status" component={Status} />
      <Route path="/submission" component={Submission} />
      <Route path="/tests" component={Tests} />
    </Switch>
  );
}

export default Router;
