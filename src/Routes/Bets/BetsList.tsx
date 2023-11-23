import { observer } from 'mobx-react-lite';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import { Bet } from '../../Types/Models.js';

const statusStyles = {
  statusWIN: {
    backgroundColor: '#f3fcf1',
  },
  statusLOSE: {
    backgroundColor: '#fcf3f1',
  },
  statusPENDING: {
    backgroundColor: '#f1f3fc',
  },
  statusVOID: {
    backgroundColor: '#fcf1fb',
  },
};

const BetsList = observer((props: { bets: Bet[] }) => {
  const columns = [
    {
      key: 'created',
      label: 'Created',
    },
    {
      key: 'playerName',
      label: 'Player',
    },
    {
      key: 'odd',
      label: 'Odd',
    },
    {
      key: 'market',
      label: 'Market',
    },
    {
      key: 'stake',
      label: 'Stake',
    },
    {
      key: 'toReturn',
      label: 'To Return',
    },
  ];

  return (
    <Paper sx={{ maxWidth: 800 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(
              (column) => (
                <TableCell key={column.key}>{column.label}</TableCell>
              ),
              this,
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.bets.map((b) => {
            return (
              <TableRow
                hover
                tabIndex={-1}
                key={b.id}
                sx={{
                  height: 40,
                  '& td': {
                    height: 30, //'auto !important'
                  },
                  backgroundColor: statusStyles['status' + b.status],
                }}
              >
                <TableCell>{moment(b.createdAt).fromNow()}</TableCell>
                <TableCell>{b.marketState.playerName}</TableCell>
                <TableCell>{b.marketState.odd}</TableCell>
                <TableCell>{b.marketState.marketName}</TableCell>
                <TableCell>{b.stake}</TableCell>
                <TableCell>{b.toReturn.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
});

export default BetsList;
