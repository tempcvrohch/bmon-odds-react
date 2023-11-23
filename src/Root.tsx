import { Outlet } from 'react-router-dom';

import {CssBaseline} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { RootStoreProvider } from './Stores/Store.js';
import Toast from './Components/Router/Toast.js';
import UserAppBar from './Components/Router/UserAppBar.js';
import Navigator from './Components/Router/Navigator.js';

const theme = createTheme({
  palette: {
    primary: { main: '#2C4770' },
    secondary: { main: '#246C60' },
  },
});

export default function () {
  return (
    <ThemeProvider theme={theme}>
      <RootStoreProvider>
        <div className="bg1"></div>
        <div className="bg2"></div>
        <div className="root">
          <CssBaseline />
          <Toast />
          <Navigator />
          <main className="main">
            <UserAppBar />
            <Outlet />
          </main>
        </div>
      </RootStoreProvider>
    </ThemeProvider>
  );
}
