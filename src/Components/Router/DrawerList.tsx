import React from 'react';
import { Link } from 'react-router-dom';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/react';
import { Badge, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, PermIdentity } from '@mui/icons-material';

const DrawerList = observer(() => {
  const rootStore: RootStore = React.useContext(RootStoreContext);

  const isBadgeInvisible = () =>
    !rootStore.userStore.user || rootStore.userStore.user.pendingBetsAmount === 0;
  const badgeContent = () =>
    rootStore.userStore.user ? rootStore.userStore.user.pendingBetsAmount : 0;

  return (
    <nav css={css`width: {xs: 50, sm: 180`}>
      <List>
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText>Matches</ListItemText>
        </ListItem>
        {rootStore.userStore.loggedIn ? (
          <div>
            <ListItem component={Link} to="/bets">
              <ListItemIcon>
                <Badge
                  sx={{ margin: 20 }}
                  invisible={isBadgeInvisible()}
                  badgeContent={badgeContent()}
                  color="secondary"
                >
                </Badge>
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
            <ListItem component={Link} to="/login">
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
