import React from 'react';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        width: 150,
        textAlign: 'center'
    }
})

export default function NoBets(props) {
    const classes = useStyles()

    return useObserver(() => (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography>{props.text}</Typography>
            </Paper>
        </div>
    ));
}