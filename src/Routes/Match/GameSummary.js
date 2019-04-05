import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {

    },
    table: {
        margin: 5,
        borderCollapse: 'collapse',
        borderStyle: 'hidden',
        '& td': {
            border: '1px solid black',
            padding: 5
        }
    },
    gameIndicator: {
        fontWeight: 'bold'
    }
});

export default function GameSummary(props) {
    const classes = useStyles()

    return useObserver(() => (
        <div className={classes.root}>
            <span className={classes.gameIndicator}>{props.game.gameScore}</span>
            <table className={classes.table}>
                <tbody>
                    <tr>
                        {
                            props.game.pointMutations.map((mut, i) => (
                                <td key={i}>{mut.split('-')[0]}</td>
                            ))
                        }
                    </tr>
                    <tr>
                        {
                            props.game.pointMutations.map((mut, i) => (
                                <td key={i}>{mut.split('-')[1]}</td>
                            ))
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    ));
}