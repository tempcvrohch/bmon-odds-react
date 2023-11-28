import { Outlet } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { RootStoreProvider } from './Stores/Store.js';
import Toast from './Components/Router/Toast.js';
import UserAppBar from './Components/Router/UserAppBar.js';
import Navigator from './Components/Router/Navigator.js';
import { css } from '@emotion/react';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function () {
  return (
    <ThemeProvider theme={theme}>
      <RootStoreProvider>
        <div className="app-root" css={css`
					display: grid;
					grid-template: 
						"appbar appbar appbar" 70px
						"aside outlet outlet" auto
						/ auto 1fr 1fr;
				`}>
          <CssBaseline />
          <Toast />
          <UserAppBar/>
          <Navigator />
          <main className="outlet" css={css`grid-area: outlet;`}>
            <Outlet />
          </main>
        </div>
      </RootStoreProvider>
    </ThemeProvider>
  );
}
