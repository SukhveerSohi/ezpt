//ForgetPassword.js sends an email to reset the password
import React, { useState, useRef } from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {Link} from 'react-router-dom';

export default function ForgotPassword() {
    //storing input email
    const emailRef = useRef();
    //import resetPassword function from App Context.
    const { resetPassword } = useAuth();

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading,setLoading] = useState(false);

    //handling submission
    async function handleSubmit(e){
        e.preventDefault()
        
        try{
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions');
        }catch{
            setError('Failed to Reset Password');
        }
        setLoading(false);
    }

    return (
        <>

            <div>
                <h2>Password Reset</h2>
                {error && <h3>{error}</h3>}
                {message && <h3>{message}</h3>}
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" ref={emailRef} required/>
                    <button disabled={loading} type="submit">Reset Password</button>
                </form>
                <div>
                    <Link to="/login">Login</Link>
                </div>

            </div>
            <div>
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
            
        </>
    )
}
