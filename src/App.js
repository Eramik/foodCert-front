import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import { useCookies } from 'react-cookie';
import locale_uk from 'dayjs/locale/uk';
import dayjs from 'dayjs';

export default function App() {
  const [cookies] = useCookies(['auth_token']);

  if (cookies.lang === 'ua') {
    dayjs.locale(locale_uk);
  } else {
    dayjs.locale('en');
  }
  

  return (
    <Router>
      <div>
        <Switch>
          <Redirect exact from="/" to="/signIn" />
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            {cookies.auth_token ? 
              <Dashboard />
              : <Redirect to="/signIn" />
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
