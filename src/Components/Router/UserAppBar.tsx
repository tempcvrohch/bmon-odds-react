import React from "react";
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite'
import { AppBar, Toolbar, Typography } from "@mui/material";

const UserAppBar = observer(() => {
    const { userStore } = React.useContext(RootStoreContext) as RootStore;

    return (
        <AppBar position="static">
            <Toolbar sx={{justifyContent: 'flex-end'}}>
                {userStore.user ?
                    <div>
                        <div><Typography color="inherit">{userStore.user.username}</Typography></div>
                        <div><Typography color="inherit">Balance: €{userStore.user.balance}</Typography></div>
                    </div> : <div></div>
                }
            </Toolbar>
        </AppBar>
    );
});

export default UserAppBar;