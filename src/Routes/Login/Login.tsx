import React from 'react';
import { RootStoreContext, RootStore } from '../../Stores/Store.js';
import { observer } from 'mobx-react-lite';
import LatestChanges from './LatestChanges.js';
import { VERSION } from '../../Constants/Constants.js';
import { css } from '@emotion/react';
import { Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';

const Login = observer(() => {
  let { userStore, toastStore } = React.useContext(RootStoreContext) as RootStore;
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
      .Login(values)
      .then(async () => {
        toastStore.snackbarSuccess('Logged in successfully!');
        await userStore.GetCurrentUserSession();
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
            marginTop: 50,
            textAlign: 'center',
            padding: 30,
            background: '#2C4770',
            color: '#fff',
          `}
        >
          <Typography variant="h5" color="inherit">
            {userStore.loggedIn ? 'Welcome' : 'Login'}
          </Typography>
        </hgroup>
        <Paper
          css={css`
            height: 500,
            width: 420,
          `}
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
                      width: 300;
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
                      width: 300;
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
                      display: 'flex',
                      justifyContentContent: 'center',
                      marginTop: 50,
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
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -12,
                            marginLeft: -12,
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
            height: 30,
            color: '#fff',
            padding: 5,
            opacity: 0.7,
            textAlign: 'center',
            background: '#2C4770',
          `}
        >
          <span>Bmon Odds v{VERSION}</span>
        </div>
      </div>
    </Grid>
  );
});

export default Login;
