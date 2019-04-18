import React from 'react';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import SetSummary from './SetSummary';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles({
    toolbar: {
        color: '#fff',
        backgroundColor: '#2C4770',
    }
});

function splitMatchMutationsOnSets(matchMutations){
    let lastSetScore = matchMutations[matchMutations.length - 1].pointScore
    if(!lastSetScore.includes(',')){
        return [matchMutations] //this match only has 1 set (so far)
    }

    let lastSets = lastSetScore.split(',')
    let matchMutationsOnSets = []
    lastSets.forEach(() => matchMutationsOnSets.push([]))

    matchMutations.forEach((mut) => {
        let ind = (mut.pointScore.match(/,/g)||[]).length
        matchMutationsOnSets[ind].push(mut)
    })

    return matchMutationsOnSets
}

export default function SetContainer(props) {
    const classes = useStyles()
    const setMutations = splitMatchMutationsOnSets(props.matchStates)

    return useObserver(() => (
        <div>
            <Toolbar className={classes.toolbar}>Set Summaries</Toolbar>
            {setMutations.map((setMutationArray, ind) => (
                <SetSummary key={ind} setIndex={ind} mutations={setMutationArray}></SetSummary>
            ))}
        </div>
    ));
}