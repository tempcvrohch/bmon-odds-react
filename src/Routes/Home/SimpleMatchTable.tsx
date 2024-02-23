import { observer } from 'mobx-react-lite';

import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Search } from '@mui/icons-material';
import { MatchDto } from '../../openapi/models/MatchDto.js';
import { useNavigate } from 'react-router-dom';

const SimpleMatchTable = observer((props: { matches: MatchDto[] }) => {
	const navigate = useNavigate();

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
            .map((n) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={n.id}
                  sx={{
                    height: 40,
                    '& td': {
                      height: 30, //'auto !important'
                    },
                  }}
                >
                  <TableCell>{n.name}</TableCell>
                  <TableCell>{n.league.name}</TableCell>
                  <TableCell>{n.matchState.setScore}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="details"
                      onClick={() => navigate('/match/' + n.id)}
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
