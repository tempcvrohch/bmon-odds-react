

import React from "react";
import { makeStyles } from '@material-ui/styles';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    toolbar: {
        justifyContent: 'flex-end'
    }
});

export default function UserAppBar() {
    const { userStore } = React.useContext(RootStoreContext);
    const classes = useStyles();

    return useObserver(() => (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                {userStore.user ?
                    <div>
                        <div><Typography color="inherit">{userStore.user.username}</Typography></div>
                        <div><Typography color="inherit">Balance: €{userStore.user.balance}</Typography></div>
                    </div> : <div></div>
                }
            </Toolbar>
        </AppBar>
    ))
}