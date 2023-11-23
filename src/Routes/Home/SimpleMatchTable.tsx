import { observer } from 'mobx-react-lite';

import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Match } from '../../Types/Models.js';

const SimpleMatchTable = observer((props: { matches: Match[] }) => {
  const columns = [
    {
      key: 'name',
      label: 'Match Name',
    },
    {
      key: 'leagueName',
      label: 'League',
    },
    {
      key: 'score',
      label: 'Score',
    },
    {
      key: 'details',
      label: 'Details',
    },
  ];

  return (
    <Paper
      sx={{
        maxWidth: 800,
      }}
    >
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
          {props.matches
            .sort((a, b) => a.leagueName.localeCompare(b.leagueName))
            .map((n) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={n.bId}
                  sx={{
                    height: 40,
                    '& td': {
                      height: 30, //'auto !important'
                    },
                  }}
                >
                  <TableCell>{n.name}</TableCell>
                  <TableCell>{n.leagueName}</TableCell>
                  <TableCell>{n.matchState.setScore}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="details"
                      // onClick={() => router.history.push('/match/' + n.id)}
                      onClick={() => console.log('TODO: implement me')}
                    >
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

export default SimpleMatchTable;
