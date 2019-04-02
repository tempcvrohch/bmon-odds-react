import React, { useEffect, useState } from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import MatchSummary from './MatchSummary'

const useStyles = makeStyles({
    paper: {
        maxWidth: 800
    }
})

export default function Home(props) {
    const classes = useStyles()
    const { matchStore } = React.useContext(RootStoreContext);
    const [match, setMatch] = useState(null)

    useEffect(() => {
        console.log(props)
        matchStore.FetchMatch(props.match.params.id).then(match => {
            setMatch(match)
        })
    }, [])

    return useObserver(() => (
        <div>
            {
                match ? <MatchSummary match={match}></MatchSummary> : <span>loading...</span>
            }
        </div>
    ));
}