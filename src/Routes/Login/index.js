import React from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import LatestChanges from './LatestChanges';
import Consts from '../../Consts';

const useStyles = makeStyles({
    loginForm: {
        height: 500,
        width: 420,
    },
    hGroup: {
        marginTop: 50,
        textAlign: 'center',
        padding: 30,
        background: '#2C4770',
        color: '#fff'
    },
    hTitle: {
        color: '#fff',
        fontWeight: 300,
    },
    textField: {
        width: 300
    },
    loginButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50
    },
    footer: {
        height: 30,
        color: '#fff',
        padding: 5,
        opacity: 0.7,
        textAlign: 'center',
        background: '#2C4770',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    changes: {
        marginTop: 8
    }
});

export default function Login() {
    let { userStore, toastStore } = React.useContext(RootStoreContext);
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: '',
        password: '',
    });

    const [loading, setLoading] = React.useState(false)

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const submitLogin = () => {
        setLoading(true)

        userStore.Login(values).then(() => {
            toastStore.snackbarSuccess('Logged in successfully!')
            setLoading(false)
        }).catch((e) => {
            console.error(e)
            toastStore.snackbarError('Wrong usr/psw')
            setLoading(false)
        })
    }

    return useObserver(() => (
        <Grid container justify="center">
            <div>
                <hgroup className={classes.hGroup}>
                    <Typography variant="h5" color="inherit">
                        {userStore.loggedIn ? 'Welcome' : 'Login'}
                    </Typography>
                </hgroup>
                <Paper className={classes.loginForm}>
                    {
                        userStore.loggedIn ?
                            <LatestChanges/> :
                            <Grid container justify="center">
                                <Grid item>
                                    <Grid item>
                                        <TextField
                                            required
                                            className={classes.textField}
                                            label="Username"
                                            type="text"
                                            margin="normal"
                                            onChange={handleChange('username')}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            required
                                            className={classes.textField}
                                            label="Password"
                                            type="password"
                                            margin="normal"
                                            onChange={handleChange('password')}
                                        />
                                    </Grid>
                                    <Grid item >
                                        <div className={classes.loginButton}>
                                            <Button variant="contained" color="primary" size="large" disabled={loading} onClick={submitLogin}>
                                                Login
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                    }
                </Paper>
                <div className={classes.footer}>
                    <span>Bmon Odds v{Consts.VERSION}</span>
                </div>
            </div>
        </Grid>
    ));
}

