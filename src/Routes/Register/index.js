import React from 'react';
import { RootStoreContext } from '../../Stores';
import { useObserver } from 'mobx-react-lite'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
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
    }
});


//mostly a copypaste from ../Login, in the real world the register page would look different 
export default function Register() {
    let { accountStore, userStore, toastStore } = React.useContext(RootStoreContext);
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        agreed: false,
    });

    const [loading, setLoading] = React.useState(false)

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleCheckboxChange = name => event => {
        setValues({ ...values, [name]: event.target.checked });
      };

    const submitRegistration = () => {
        setLoading(true)

        userStore.Register(values).then(() => {
            toastStore.snackbarSuccess('Registered successfully!')
            setLoading(false)
        }).catch((e) => {
            // console.log('submitRegistration: catch', e)
            toastStore.snackbarError('Bad input')
            setLoading(false)
        })
    }

    return useObserver(() => (
        <Grid container justify="center">
            <div>
                <hgroup className={classes.hGroup}>
                    <Typography variant="h5" color="inherit">
                        Register
                    </Typography>
                </hgroup>
                <Paper className={classes.loginForm}>
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
                            <Grid item >
                                <div className={classes.loginButton}>
                                    <Button variant="contained" color="primary" size="large" disabled={loading || !values.agreed} onClick={submitRegistration}>
                                        Register
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <div className={classes.footer}>
                    <span>Bmon Odds v{Consts.VERSION}</span>
                </div>
            </div>
        </Grid>
    ));
}

