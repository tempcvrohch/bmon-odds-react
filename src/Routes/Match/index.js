import React, { useEffect, useState } from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import MatchSummary from './MatchSummary'
import SetsContainer from './SetsContainer'
import Betslip from './Betslip';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: 50
    }
})

export default function Home(props) {
    const classes = useStyles()
    const { matchStore } = React.useContext(RootStoreContext);
    const [match, setMatch] = useState(null)

    useEffect(() => {
        matchStore.FetchMatch(props.match.params.id).then(match => {
            setMatch(match)
        })
    }, [])

    return useObserver(() => (
        <div>
            {
                match ? <div className={classes.root}>
                    <div>
                        <MatchSummary match={match}></MatchSummary>
                        <Betslip match={match}></Betslip>
                    </div>
                    <SetsContainer matchStates={match.matchStates}></SetsContainer>
                </div> : <span>loading...</span>
            }
        </div>
    ));
}