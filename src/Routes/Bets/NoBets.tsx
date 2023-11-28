import { observer } from 'mobx-react-lite';
import { css } from '@emotion/react';
import { Paper, Typography } from '@mui/material';

const NoBets = observer((props: { text: String }) => {
  return (
    <div
      css={css`
        margin-top: 50px;
        display: 'flex';
        justify-content: 'center';
      `}
    >
      <Paper sx={{ width: 150, textAlign: 'center' }}>
        <Typography>{props.text}</Typography>
      </Paper>
    </div>
  );
});

export default NoBets;
