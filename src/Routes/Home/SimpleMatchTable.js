import React from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';

const useStyles = makeStyles({
    paper: {
        maxWidth: 800
    },
    row: {
        height: 40,
        '& td': {
            height: 30//'auto !important'
        }
    }
})

export default function SimpleMatchTable(props) {
    let { router } = React.useContext(RootStoreContext);
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
    }, {
        key: 'details',
        label: 'Details'
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
                    {props.matches.sort((a, b) => a.leagueName.localeCompare(b.leagueName)).map(n => {
                        return (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={n.bId}
                                className={classes.row}>
                                <TableCell>{n.name}</TableCell>
                                <TableCell>{n.leagueName}</TableCell>
                                <TableCell>{n.matchState.setScore}</TableCell>
                                <TableCell>
                                    <IconButton className={classes.button} aria-label="details" onClick={() => router.history.push('/match/' + n.id)}>
                                        <Search />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Paper>
    ));
}