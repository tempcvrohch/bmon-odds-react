import React, { useEffect, useState } from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BetsList from './BetsList';
import NoBets from './NoBets';

const useStyles = makeStyles({
    root: {
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center'
    },
    toolbar: {
        color: '#fff',
        backgroundColor: '#2C4770',
    }
})

export default function Bets() {
    const classes = useStyles()
    let { userStore, toastStore } = React.useContext(RootStoreContext);
    const [bets, setBets] = useState([])

    useEffect(() => {
        userStore.GetCurrentUserBets().then(bets => {
            console.log(bets)
            setBets(bets)
        }).catch(e => {
            if (!e.message.includes('401')) {
                toastStore.snackbarError(`Failed to retreive pending bets`)
            }

            console.error(e)
        })
    }, [])

    return useObserver(() => (
        <div className={classes.root}>
            <div>
                {bets.filter(b => b.status === 'PENDING').length > 0 ? (
                    <Paper>
                        <Toolbar className={classes.toolbar}>
                            <Typography variant="h6" color="inherit">
                                Pending
                    </Typography>
                        </Toolbar>
                        <BetsList bets={bets.filter(b => b.status === 'PENDING')}></BetsList>
                    </Paper>
                ) : <NoBets text={"No pending bets..."}></NoBets>}
                {bets.filter(b => b.status !== 'PENDING').length > 0 ? (
                    <Paper>
                        <Toolbar className={classes.toolbar}>
                            <Typography variant="h6" color="inherit">
                                Resolved
                    </Typography>
                        </Toolbar>
                        <BetsList bets={bets.filter(b => b.status !== 'PENDING')}></BetsList>
                    </Paper>
                ) :
                    <NoBets text={"No resolved bets..."}></NoBets>
                }
            </div>
        </div>
    ));
}