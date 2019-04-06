import React from 'react';
import { useObserver } from 'mobx-react-lite'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    changes: {
        marginTop: 8
    }
});

export default function LatestChanges() {
    const classes = useStyles()
    
    return useObserver(() => (
        <Grid container justify="center">
            <Grid item className={classes.changes}>
                <Typography variant="h4" color="inherit">
                    Latest Changes
                                    </Typography>
                <Typography color="inherit">28/02/2019</Typography>
                <ul>
                    <li><Typography color="inherit">Various bug fixes</Typography></li>
                    <li><Typography color="inherit">Updated BCM software</Typography></li>
                </ul>
                <Typography color="inherit">08/02/2019</Typography>
                <ul>
                    <li><Typography color="inherit">Launched new portal</Typography></li>
                    <li><Typography color="inherit">Updated BCM software</Typography></li>
                </ul>
                <Typography color="inherit">20/01/2019</Typography>
                <ul>
                    <li><Typography color="inherit">Started work on new portal</Typography></li>
                </ul>
            </Grid>
        </Grid>
    ));
}

