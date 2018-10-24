import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import { PageWrapper } from './components/organisms/PageWrapper';

import { LoginPage } from './components/pages/LoginPage';
import { HomePage } from './components/pages/HomePage';
import { AddUserPage } from './components/pages/AddUserPage';
import { NewPasswordPage } from './components/pages/NewPasswordPage';


export const AppRoutes = () => (
  // <PageWrapper>
    <Switch>
      <Route path="/" exact component={LoginPage} />
			<Route path="/Home" exact component={HomePage} />
			<Route path="/AddUser" exact component={AddUserPage} />
			<Route path="/NewPassword/:link" exact component={NewPasswordPage} />
      {/* <Route path="/products" exact component={ProductListPage} />
      <Route path="/products/:productId" exact component={ProductDetailPage} />
      <Route path="/contact" exact component={ContactPage} />
      <Route path="/contact/:contactId" exact component={ContactDetail} />
      <Route path="/cart" exact component={ShoppingCartPage} />
      <Route path="*" component={PageNotFound} /> */}
    </Switch>
  // </PageWrapper>
);
