import React from 'react';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import {
  Grid,
  Button,
  Paper,
  CircularProgress,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { VERSION } from '../../Constants/Constants.js';
import { css } from '@emotion/react';

//mostly a copypaste from ../Login, in the real world the register page would look different
const Register = observer(() => {
  let { userStore, toastStore } = React.useContext(RootStoreContext) as RootStore;
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    agreed: false,
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheckboxChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const submitRegistration = () => {
    setLoading(true);

    userStore
      .Register(values)
      .then(() => {
        toastStore.snackbarSuccess('Registered successfully!');
        setLoading(false);
      })
      .catch((e) => {
        // console.log('submitRegistration: catch', e)
        toastStore.snackbarError('Bad input');
        setLoading(false);
      });
  };

  return (
    <Grid container justifyContent="center">
      <div>
        <hgroup
          css={css`
            margin-top: 50px;
            text-align: 'center';
            padding: 30px;
            background: '#2C4770';
            color: '#fff';
          `}
        >
          <Typography variant="h5" color="inherit">
            Register
          </Typography>
        </hgroup>
        <Paper
          sx={{
            height: 500,
            width: 420,
          }}
        >
          <Grid container justifyContent="center">
            <Grid item>
              <Grid item>
                <TextField
                  required
                  sx={{
                    width: 300,
                  }}
                  label="Username"
                  type="text"
                  margin="normal"
                  onChange={handleChange('username')}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  sx={{ width: 300 }}
                  label="Password"
                  type="password"
                  margin="normal"
                  onChange={handleChange('password')}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      onChange={handleCheckboxChange('agreed')}
                      value="agreed"
                      color="primary"
                    />
                  }
                  label="Agree to blabla?"
                />
              </Grid>
              <Grid item>
                <div
                  css={css`
                    display: 'flex';
                    justify-content: 'center';
                    margin-top: 50px;
                  `}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading || !values.agreed}
                    onClick={submitRegistration}
                  >
                    Register
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: -12,
                          marginLeft: -12,
                        }}
                      />
                    )}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <div
          css={css`
            height: 30px;
            color: '#fff';
            padding: 5px;
            opacity: 0.7;
            text-align: 'center';
            background: '#2C4770';
          `}
        >
          <span>Bmon Odds v{VERSION}</span>
        </div>
      </div>
    </Grid>
  );
});

export default Register;
