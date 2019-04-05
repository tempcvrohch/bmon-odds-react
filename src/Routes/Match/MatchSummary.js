import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    card: {
        width: 400,
        height: 300
    },
    scoreContainer: {
        width: 400,
        height: 120,
        textAlign: 'center'
    },
    setScoreIndicator: {
        fontSize: 100,
        margin: 10
    }
})

function findLeagueIdentifier(leagueName) {
    const leagues = ['atp', 'chall', 'itf', 'wta']
    let foundLeague = 'ukn'

    leagues.forEach(leagueId => {
        if (leagueName.includes(leagueId)) {
            foundLeague = leagueId
        }
    })

    return foundLeague
}

function parseSets(setScore) {
    let sets = [setScore]
    if (setScore.includes(',')) {
        sets = setScore.split(',')
    }

    return sets
}

function parseIndividualSetScores(sets) {
    let playerSetScores = [0, 0]

    sets.forEach(set => {
        let splitSet = set.split('-')
        let setWinnerIndex = +splitSet[0] > +splitSet[1] ? 0 : 1
        playerSetScores[setWinnerIndex]++
    })

    return playerSetScores
}

export default function MatchSummary(props) {
    const classes = useStyles()
    const foundLeague = findLeagueIdentifier(props.match.leagueName.toLowerCase())
    const sets = parseSets(props.match.matchState.pointScore)
    const playerScores = parseIndividualSetScores(sets)

    return useObserver(() => (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar alt={'L'} src={`/img/${foundLeague}.png`} />
                }
                title={props.match.name}
                subheader={props.match.leagueName}
            />
            {/*TODO: fix child css */}
            <div className={classes.scoreContainer}> 
                <span className={classes.setScoreIndicator}>{playerScores[0]}</span>
                <span className={classes.setScoreIndicator}>:</span>
                <span className={classes.setScoreIndicator}>{playerScores[1]}</span>
            </div>
            <CardContent>
                <ul>
                    {sets.map(set => (
                        <li key={set}><Typography component="p">
                            {set}
                        </Typography></li>
                    ), this)}
                </ul>
            </CardContent>
        </Card>
    ));
}