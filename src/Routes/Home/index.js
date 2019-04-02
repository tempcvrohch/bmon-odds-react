import React, { useEffect } from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import SimpleMatchTable from './SimpleMatchTable';

const useStyles = makeStyles({
    paper: {
        maxWidth: 800
    }
})

export default function Home() {
    const classes = useStyles()
    let { matchStore } = React.useContext(RootStoreContext);

    useEffect(() => {
        matchStore.FetchRecentMatches()
    }, [])

    return useObserver(() => (
        <div>
            <SimpleMatchTable matches={matchStore.recentMatches.filter(m => m.live)}></SimpleMatchTable>
        </div>
    ));
}