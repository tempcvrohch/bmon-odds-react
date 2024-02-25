import { observer } from 'mobx-react-lite';
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { formatDistance } from 'date-fns';
import { BetDto } from '../../openapi/models/BetDto.js';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const statusStyles = {
  statusWIN: {
    backgroundColor: '#f3fcf1',
  },
  statusLOSS: {
    backgroundColor: '#412323',
  },
  statusPENDING: {
    backgroundColor: '#f1f3fc',
  },
  statusVOID: {
    backgroundColor: '#4b4b4b',
  },
};

const BetsList = observer((props: { bets: BetDto[] }) => {
	const navigate = useNavigate();
  
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
		{
			key: 'lookupMatch',
			label: 'Match'
		}
  ];

  return (
    <Paper sx={{ maxWidth: 800, backgroundColor: '#2f2f2f' }}>
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
                {b.createdAt && <TableCell>{formatDistance(b.createdAt, new Date())}</TableCell>}
                <TableCell>
                  {b.marketState.player.firstname} {b.marketState.player.lastname}
                </TableCell>
                <TableCell>{b.marketState.odd}</TableCell>
                <TableCell>{b.marketState.market.name}</TableCell>
                <TableCell>{b.stake}</TableCell>
                <TableCell>{b.toReturn?.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton aria-label="details" onClick={() => navigate('/match/' + b.id)}>
                    <Search />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
});

export default BetsList;
