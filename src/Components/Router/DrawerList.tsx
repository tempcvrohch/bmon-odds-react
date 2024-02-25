import React from 'react';
import { Link } from 'react-router-dom';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/react';
import { Badge, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, PermIdentity, PersonAdd } from '@mui/icons-material';

const DrawerList = observer(() => {
  const rootStore: RootStore = React.useContext(RootStoreContext);

  const isBadgeInvisible = () =>
    !rootStore.userStore.user || rootStore.userStore.bets.filter(b => b.status === 'PENDING').length === 0;
  const badgeContent = () =>
    rootStore.userStore.user ? rootStore.userStore.bets.filter(b => b.status === 'PENDING').length : 0;

  return (
    <nav
      css={css`
        width: 180px;
        background-color: #2f2f2f;

        @media (max-width: 768px) {
          width: 50px;
        }
      `}
    >
      <List>
        <ListItem sx={{ color: 'white' }} component={Link} to="/">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText>Matches</ListItemText>
        </ListItem>
        {rootStore.userStore.loggedIn ? (
          <div>
            <ListItem sx={{ color: 'white' }} component={Link} to="/bets">
              <ListItemIcon>
                <Badge
                  sx={{ margin: 2 }}
                  invisible={isBadgeInvisible()}
                  badgeContent={badgeContent()}
                  color="secondary"
                ></Badge>
              </ListItemIcon>
              <ListItemText>Bets</ListItemText>
            </ListItem>
            <Divider />
            <ListItem onClick={() => rootStore.userStore.logout()}>
              <ListItemIcon>
                <PermIdentity />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </div>
        ) : (
          <div>
            <Divider />
            <ListItem sx={{ color: 'white' }} component={Link} to="/register">
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText>Register</ListItemText>
            </ListItem>
            <Divider />
            <ListItem sx={{ color: 'white' }} component={Link} to="/login">
              <ListItemIcon>
                <PermIdentity />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItem>
          </div>
        )}
      </List>
    </nav>
  );
});

export default DrawerList;
