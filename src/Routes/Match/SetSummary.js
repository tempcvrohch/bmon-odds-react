import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    panel: {
        width: 400
    }
});

const numberSuffixes = ['st', 'nd', 'rd', 'th', 'th']

export default function SetSummary(props) {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(null);

    const onPanelClick = () => {
        setExpanded(!!expanded);
    };

    return useObserver(() => (
        <ExpansionPanel className={classes.panel} expanded={expanded} onChange={onPanelClick}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Typography>{`${props.setIndex + 1}${numberSuffixes[props.setIndex]} Set`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <ul>
                    {props.mutations.map((mut, i) => (
                        <li key={mut.createdAt}>
                            <Typography>{`${mut.pointScore}: ${mut.setScore}`}</Typography>
                        </li>
                    ))}
                </ul>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    ));
}