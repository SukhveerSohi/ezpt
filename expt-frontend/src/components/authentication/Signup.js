//Signup.js for signing up new users
import React, { useState, useRef } from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';
import { Button, FormControlLabel,Checkbox, TextField, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';


import {useAuthStyles} from '../../styles/authPageStyle.js';


export default function Signup() {

    // storing input values
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    // importing signup function
    const { signup } = useAuth();

    const [error, setError] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    
    //handle Sign up submission
    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== passwordRef.current.value){
             return setError('Passwords do not match');
        }
        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordConfirmRef.current.value )
            history.push("/");
        }catch{
            setError('Failed to create an account');
        }
        setLoading(false);
    }

    const classes = useAuthStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>

                <Typography component="h1" variant="h5">Sign Up</Typography>
                {error && <Typography variant="subtitle1" color="Secondary">{error}</Typography>}
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirm-password"
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                        ref={passwordConfirmRef}
                    />
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary"/>}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                    <Typography  style={{"margin-top":"1.5em"}} variant="body2">By signing up, you agree to the Terms of Service and Privacy Policy, including CookieUse</Typography>
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Link className={classes.link} to="/login" variant="body2">
                        Already have an account? Sign Up
                    </Link>
                </form>

            </div>
        </Container>
    )
}
