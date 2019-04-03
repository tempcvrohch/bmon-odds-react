import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import SetSummary from './SetSummary';

const useStyles = makeStyles({
    
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
    console.log(setMutations)

    return useObserver(() => (
        <div>
            {setMutations.map((setMutationArray, ind) => (
                <SetSummary key={ind} setIndex={ind} mutations={setMutationArray}></SetSummary>
            ))}
        </div>
    ));
}