import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './Root.js'
import Home from './Routes/Home/Home.js';
import Match from './Routes/Match/Match.js';
import Login from './Routes/Login/Login.js';
import Register from './Routes/Register/Register.js';
import Bets from './Routes/Bets/Bets.js';

import './Router.css';
import { observer } from 'mobx-react-lite';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'bets',
        Component: Bets,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'match/:id',
        Component: Match,
      },
    ],
  },
]);

const Router = observer(() => {
  return <RouterProvider router={router}></RouterProvider>;
});

export default Router;
