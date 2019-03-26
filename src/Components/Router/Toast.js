import React, { useContext } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    success: {
        backgroundColor: '#43a047 !important',
    },
    error: {
        backgroundColor: '#d32f2f !important',
    },
    info: {
        'background': '#1976d2 !important',
    },
    warning: {
        backgroundColor: '#ffa000 !important',
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: 8,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
})

function Toast() {
    const classes = useStyles();
    const { toastStore } = useContext(RootStoreContext);
    const Icon = toastStore.toast.icon;

    return useObserver(() => (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={toastStore.toast.open}
            variant={toastStore.toast.variant}>
            <SnackbarContent
                classes={{ root: classes[toastStore.toast.variant], message: classes[toastStore.toast.variant] }}
                message={
                    <span className={classes.message}>
                        <Icon className={classes.icon} />
                        {toastStore.toast.message}
                    </span>
                } />
        </Snackbar>
    ))
}

export default Toast