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
                <Typography color="inherit">14/05/2019</Typography>
                <ul>
                    <li><Typography color="inherit">Final CV Version</Typography></li>
                    <li><Typography color="inherit">etc etc etc...</Typography></li>
                </ul>
                <Typography color="inherit">12/04/2019</Typography>
                <ul>
                    <li><Typography color="inherit">etc etc etc...</Typography></li>
                    <li><Typography color="inherit">etc etc etc...</Typography></li>
                </ul>
                <Typography color="inherit">02/03/2019</Typography>
                <ul>
                    <li><Typography color="inherit">etc etc etc...</Typography></li>
                </ul>
            </Grid>
        </Grid>
    ));
}

