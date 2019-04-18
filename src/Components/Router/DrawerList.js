import React from "react";
import { makeStyles } from '@material-ui/styles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermIdentity from '@material-ui/icons/PermIdentity';
import ListIcon from '@material-ui/icons/List';
import Dashboard from '@material-ui/icons/Dashboard';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'

const useStyles = makeStyles({
    drawer: {
        width: 180
    },
    drawerThin: {
        width: 50,
    },
});

function DrawerList() {
    const rootStore = React.useContext(RootStoreContext);
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)'); //TODO: figure out why this duplication is needed

    return useObserver(() => (
        <nav className={matches ? classes.drawer : classes.drawerThin}>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText>
                        Matches
                    </ListItemText>
                </ListItem>
                {rootStore.userStore.loggedIn ?
                    <div>
                        <ListItem button component={Link} to="/bets">
                            <ListItemIcon>
                                <Badge className={classes.margin} invisible={!rootStore.userStore.user || rootStore.userStore.user.pendingBetsAmount === 0} badgeContent={rootStore.userStore.user ? rootStore.userStore.user.pendingBetsAmount: 0} color="secondary">
                                    <ListIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText>
                                Bets
                        </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => rootStore.userStore.logout()}>
                            <ListItemIcon>
                                <PermIdentity />
                            </ListItemIcon>
                            <ListItemText>
                                Logout
                            </ListItemText>
                        </ListItem>
                    </div>
                    :
                    <div>
                        <Divider />
                        <ListItem button component={Link} to="/login">
                            <ListItemIcon>
                                <PermIdentity />
                            </ListItemIcon>
                            <ListItemText>
                                Login
                            </ListItemText>
                        </ListItem>
                    </div>
                }
            </List>
        </nav>
    ))
}

export default DrawerList