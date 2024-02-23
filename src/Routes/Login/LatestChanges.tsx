import { observer } from 'mobx-react-lite';
import { Grid, Typography } from '@mui/material';

const LatestChanges = observer(() => {
  return (
    <Grid container justifyContent="center">
      <Grid
        item
        sx={{
          marginTop: 8,
        }}
      >
        <Typography variant="h4" color="inherit">
          Latest Changes
        </Typography>
        <Typography color="inherit">22/02/2024</Typography>
        <ul>
          <li>
            <Typography color="inherit">Project resurrected for another CV</Typography>
          </li>
          <li>
            <Typography color="inherit">TODO: fill this in</Typography>
          </li>
        </ul>
        <Typography color="inherit">14/05/2019</Typography>
        <ul>
          <li>
            <Typography color="inherit">Final CV Version</Typography>
          </li>
          <li>
            <Typography color="inherit">etc etc etc...</Typography>
          </li>
        </ul>
        <Typography color="inherit">12/04/2019</Typography>
        <ul>
          <li>
            <Typography color="inherit">etc etc etc...</Typography>
          </li>
          <li>
            <Typography color="inherit">etc etc etc...</Typography>
          </li>
        </ul>
        <Typography color="inherit">02/03/2019</Typography>
        <ul>
          <li>
            <Typography color="inherit">etc etc etc...</Typography>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
});

export default LatestChanges;
