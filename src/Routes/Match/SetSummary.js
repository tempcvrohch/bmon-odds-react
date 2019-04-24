import React from 'react';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import GameSummary from './GameSummary';

const useStyles = makeStyles({
    panel: {
        width: 400
    },
    expandPanel: {
        display: 'inline-block'
    }
});

const numberSuffixes = ['st', 'nd', 'rd', 'th', 'th']

function splitSetMutationsInGames(setMutations) {
    let games = []
    let currentGame
    
    setMutations.forEach(mut => {
        if (!currentGame) {
            currentGame = {
                setScore: mut.setScore,
                pointMutations: [mut.pointScore]
            }
            return
        }

        if (mut.setScore === currentGame.setScore) {
            currentGame.pointMutations.push(mut.pointScore)
        } else {
            games.push(currentGame)
            currentGame = {
                setScore: mut.setScore,
                pointMutations: [mut.pointScore]
            }
        }
    })

    return games
}

export default function SetSummary(props) {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(null);
    let games = splitSetMutationsInGames(props.mutations)

    const onPanelClick = () => {
        setExpanded(!expanded);
    };

    return useObserver(() => (
        <ExpansionPanel className={classes.panel} expanded={expanded} onChange={onPanelClick}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Typography>{`${props.setIndex + 1}${numberSuffixes[props.setIndex]} Set`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expandPanel}>
                {games.map(game => (
                    <GameSummary key={game.setScore} game={game}></GameSummary>
                ))}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    ));
}