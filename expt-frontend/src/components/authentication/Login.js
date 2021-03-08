// Login.js Log In the users
import React, { useState, useRef } from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';

import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';

import {useAuthStyles} from '../../styles/authPageStyle.js';
import { TextField, Typography, Checkbox, FormControlLabel, Button, Grid, Tabs, Tab } from '@material-ui/core';


export default function Login() {
    //storing input values
    
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useAuth();
    
    const [error, setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [accountType,setAccountType]=useState('patient');

    //to redirect to dashboard page.
    const history = useHistory();

    //handle log in submission
    async function handleSubmit(e){
        e.preventDefault()
        
        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value, accountType)
            switch(accountType){
                case 'patient':
                    history.push("/patient");
                    break;
                case 'therapist':
                    history.push("/therapist");
                    break;
                case 'admin':
                    history.push("/admin");
                    break;
            }
            
        }catch{
            setError('Failed to Sign In');
        }
        setLoading(false);
    }
    const handleChange=(event, newValue)=>{
        setAccountType(newValue);
    }

    const classes = useAuthStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">Log In</Typography>
                {error && <h3>{error}</h3>}
                
                <Tabs value={accountType} onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                <Tab label="Patient" value="patient"/>
                <Tab label="Therapist" value="therapist"/>
                <Tab label="Admin" value="admin"/>

                </Tabs>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type="email" 
                        ref={emailRef}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        ref={passwordRef}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button 
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/forgot-password" variant="body2">
                                ForgotPassword?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                            Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
