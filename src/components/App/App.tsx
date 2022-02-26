import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import style from './App.scss';
import { routes } from '@routes/index';
import { Layout } from '@components/App/Layout';

export const App = (): JSX.Element => (
  <Layout>
    <Router>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Router>
  </Layout>
);
