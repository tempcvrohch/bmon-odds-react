import React, { useEffect } from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import SimpleMatchTable from './SimpleMatchTable';
import SportList from './SportList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles({
    root: {
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center'
    }
})

export default function Bets() {
    const classes = useStyles()
    let { matchStore } = React.useContext(RootStoreContext);

    useEffect(() => {
        matchStore.FetchRecentMatches()
    }, [])

    return useObserver(() => (
        <div className={classes.root}>
            <div>
                <SportList></SportList>
                <SimpleMatchTable matches={matchStore.recentMatches.filter(m => m.live)}></SimpleMatchTable>
            </div>
        </div>
    ));
}