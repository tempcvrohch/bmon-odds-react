import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    paper: {
        maxWidth: 800
    }
})

export default function SimpleMatchTable(props) {
    const classes = useStyles()
    const columns = [{
        key: 'name',
        label: 'Match Name'
    }, {
        key: 'leagueName',
        label: 'League'
    }, {
        key: 'score',
        label: 'Score'
    }]

    return useObserver(() => (
        <Paper className={classes.paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(
                            column => (
                                <TableCell
                                    key={column.key}
                                >{column.label}</TableCell>
                            ),
                            this,
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.matches.map(n => {
                        return (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={n.bId}>
                                <TableCell>{n.name}</TableCell>
                                <TableCell>{n.leagueName}</TableCell>
                                <TableCell>{n.matchState.pointScore}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    ));
}