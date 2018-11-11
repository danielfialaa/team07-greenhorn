import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PageWrapper } from './components/organisms/PageWrapper';

import { LoginPage } from './components/pages/LoginPage';
import { HomePage } from './components/pages/HomePage';
import { AddUserPage } from './components/pages/AddUserPage';
import { UserSettingsPage } from './components/pages/UserSettingsPage';
import { NewPasswordPage } from './components/pages/NewPasswordPage';
import { ResetPasswordPage } from './components/pages/ResetPasswordPage';
import { UserTaskPage } from './components/pages/UserTaskPage';
import { AddTaskPage } from './components/pages/AddTaskPage';
import { UserAdministrationPage } from './components/pages/UserAdministrationPage';
import { UserProfilePage } from './components/pages/UserProfilePage';

export const AppRoutes = () => (
  <Switch>
    <Route path="/" exact component={LoginPage} />
    <Route path="/NewPassword/:link" exact component={NewPasswordPage} />
    <Route path="/ResetPassword" exact component={ResetPasswordPage} />
    <PageWrapper>
      <Route path="/Home" exact component={HomePage} />
      <Route path="/AddUser" exact component={AddUserPage} />
      <Route path="/UserTasks" exact component={UserTaskPage} />
      <Route path="/UserTasks/:id" exact component={UserTaskPage} />
      <Route
        path="/UserAdministration"
        exact
        component={UserAdministrationPage}
      />
      <Route path="/AddTask" exact component={AddTaskPage} />
      <Route path="/Settings" exact component={UserSettingsPage} />
    </PageWrapper>
  </Switch>
);
