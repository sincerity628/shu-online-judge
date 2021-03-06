import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotSignin from '../pages/404/NotSignin';
import AnnouncementDetail from '../pages/announcement-detail/AnnouncementDetail';
import Signin from '../pages/authentication/Signin';
import Signup from '../pages/authentication/Signup';
import Backend from '../pages/backend/Backend';
import ContestDetail from '../pages/contest/ContestDetail';
import Contests from '../pages/contest/Contests';
import ForgetPassword from '../pages/forget-password/ForgetPassword';
import Groups from '../pages/group/Groups';
import Home from '../pages/home/Home';
import ProblemDetail from '../pages/problem-detail/ProblemDetail';
import Profile from '../pages/profile/Profile';
import Rank from '../pages/rank/Rank';
import Setting from '../pages/setting/Setting';
import Status from '../pages/status/Status';
import MySubmission from '../pages/submission/MySubmission';
import SubmissionDetail from '../pages/submission/SubmissionDetail';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tag/:id" component={Home} />
      <Route path="/not-signin" component={NotSignin} />
      <Route path="/announcement/:id" component={AnnouncementDetail} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/backend" component={Backend} />
      <Route path="/contest/:id" component={ContestDetail} />
      <Route path="/contests" component={Contests} />
      <Route path="/forget-password" component={ForgetPassword} />
      <Route path="/groups" component={Groups} />
      <Route path="/problem/:id" component={ProblemDetail} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/rank" component={Rank} />
      <Route path="/setting" component={Setting} />
      <Route path="/status" component={Status} />
      <Route path="/my-submission" component={MySubmission} />
      <Route path="/submission/:id" component={SubmissionDetail} />
    </Switch>
  );
}

export default Router;
