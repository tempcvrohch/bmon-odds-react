import React from "react";
import { makeStyles } from '@material-ui/styles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import { __RouterContext } from "react-router"
import DrawerList from "./DrawerList";

const useStyles = makeStyles({
  drawer: {
    width: 180
  },
  drawerThin: {
    width: 50,
  },
});

function Navigator() {
  const classes = useStyles();
  const rootStore = React.useContext(RootStoreContext);
  rootStore.router = React.useContext(__RouterContext); //workaround till https://github.com/ReactTraining/react-router/pull/6453
  const matches = useMediaQuery('(min-width:600px)');

  return useObserver(() => (
    <div>
      <Drawer
        className={matches ? classes.drawer : classes.drawerThin}
        variant="persistent"
        open={true}
        // open={rootStore.userStore.loggedIn}
        anchor="left"
      >
        <DrawerList></DrawerList>
      </Drawer>
    </div>
  ))
}

export default Navigator