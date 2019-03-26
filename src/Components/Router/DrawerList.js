import React from "react";
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Assignment from '@material-ui/icons/Assignment';
import Dashboard from '@material-ui/icons/Dashboard';
import AccountBox from '@material-ui/icons/AccountBox';
import SettingsInputHdmi from '@material-ui/icons/SettingsInputHdmi';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'

function DrawerList() {
    const rootStore = React.useContext(RootStoreContext);

    return useObserver(() => (
        <nav>
            <List>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText>
                        Dashboard
            </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/accounts">
                    <ListItemIcon>
                        <AccountBox />
                    </ListItemIcon>
                    <ListItemText>
                        Account
            </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/tasks">
                    <ListItemIcon>
                        <Assignment />
                    </ListItemIcon>
                    <ListItemText>
                        Tasks
            </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/plugin">
                    <ListItemIcon>
                        <SettingsInputHdmi />
                    </ListItemIcon>
                    <ListItemText>
                        Plugin
            </ListItemText>
                </ListItem>
                <ListItem button onClick={() => rootStore.userStore.logout()}>
                    <ListItemIcon>
                        <PermIdentity />
                    </ListItemIcon>
                    <ListItemText>
                        Logout
            </ListItemText>
                </ListItem>
            </List>
        </nav>
    ))
}

export default DrawerList