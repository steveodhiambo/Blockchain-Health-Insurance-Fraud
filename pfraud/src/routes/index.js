import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      {/*<Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))}/>*/}
      <Route path={`${match.url}log-in`} component={asyncComponent(() => import('./LogIn'))}/>
      <Route path={`${match.url}create-claim`} component={asyncComponent(() => import('./CreateClaim'))}/>
      <Route path={`${match.url}verified-claims`} component={asyncComponent(() => import('./VerifiedClaims'))}/>
      <Route path={`${match.url}unverified-claims`} component={asyncComponent(() => import('./UnverifiedClaims'))}/>
      <Route path={`${match.url}rejected-claims`} component={asyncComponent(() => import('./RejectedClaims'))}/>
      <Route path={`${match.url}claim-analysis`} component={asyncComponent(() => import('./ClaimAnalysis'))}/>
    </Switch>
  </div>
);

export default App;
