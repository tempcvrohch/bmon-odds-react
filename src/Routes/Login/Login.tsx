import React from 'react';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import LatestChanges from './LatestChanges.js';
import { VERSION } from '../../Constants/Constants.js';
import { css } from '@emotion/react';
import { Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';

const Login = observer(() => {
  const { userStore, toastStore } = React.useContext(RootStoreContext) as RootStore;
  const [values, setValues] = React.useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitLogin = () => {
    setLoading(true);

    userStore
      .Login(values.username, values.password)
      .then(async () => {
        toastStore.snackbarSuccess('Logged in successfully!');
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        toastStore.snackbarError('Wrong usr/psw');
        setLoading(false);
      });
  };

  return (
    <Grid container justifyContent="center">
      <div>
        <hgroup
          css={css`
            margin-top: 50px;
            text-align: center;
            padding: 30px;
            background: #2c4770;
            color: #fff;
          `}
        >

          <Typography variant="h5" color="inherit">
            Login
          </Typography>
				</hgroup>
        <Paper
          sx={{
            height: 500,
            width: 420,
            backgroundColor: '#202020;',
            background: 'aliceblue',
          }}
        >
          {userStore.loggedIn ? (
            <LatestChanges />
          ) : (
            <Grid container justifyContent="center">
              <Grid item>
                <Grid item>
                  <TextField
                    required
                    css={css`
                      width: 300px;
                    `}
                    label="Username"
                    type="text"
                    margin="normal"
                    onChange={handleChange('username')}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    css={css`
                      width: 300px;
                    `}
                    label="Password"
                    type="password"
                    margin="normal"
                    onChange={handleChange('password')}
                  />
                </Grid>
                <Grid item>
                  <div
                    css={css`
                      display: flex;
                      justify-content: center;
                      margin-top: 50px;
                    `}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={loading}
                      onClick={submitLogin}
                    >
                      Login
                      {loading && (
                        <CircularProgress
                          size={24}
                          css={css`
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            margin-top: -12px;
                            margin-left: -12px;
                          `}
                        />
                      )}
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>
        <div
          css={css`
            height: 30px;
            color: #fff;
            padding: 5px;
            opacity: 0.7;
            text-align: center;
            background: #2c4770;
          `}
        >
          <span>Bmon Odds v{VERSION}</span>
        </div>
      </div>
    </Grid>
  );
});

export default Login;
