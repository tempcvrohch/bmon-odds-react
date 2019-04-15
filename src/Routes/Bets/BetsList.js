import React, { useEffect } from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import classnames from 'classnames';

const useStyles = makeStyles({
    paper: {
        maxWidth: 800
    },
    row: {
        height: 40,
        '& td': {
            height: 30//'auto !important'
        }
    },
    statusWIN: {
        backgroundColor: '#f3fcf1'
    },
    statusLOSE: {
        backgroundColor: '#fcf3f1'
    },
    statusPENDING: {
        backgroundColor: '#f1f3fc'
    },
    statusVOID: {
        backgroundColor: '#fcf1fb'
    }
})

export default function BetsList(props) {
    let { router } = React.useContext(RootStoreContext);
    const classes = useStyles()
    const columns = [{
        key: 'created',
        label: 'Created'
    }, {
        key: 'playerName',
        label: 'Player'
    }, {
        key: 'odd',
        label: 'Odd'
    }, {
        key: 'market',
        label: 'Market'
    }, {
        key: 'stake',
        label: 'Stake'
    }, {
        key: 'toReturn',
        label: 'To Return'
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
                    {props.bets.map(b => {
                        return (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={b.id}
                                className={classnames(classes.row, classes['status' + b.status])}>
                                <TableCell>{moment(b.createdAt).fromNow()}</TableCell>
                                <TableCell>{b.marketState.playerName}</TableCell>
                                <TableCell>{b.marketState.odd}</TableCell>
                                <TableCell>{b.marketState.marketName}</TableCell>
                                <TableCell>{b.stake}</TableCell>
                                <TableCell>{b.toReturn.toFixed(2)}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Paper>
    ));
}