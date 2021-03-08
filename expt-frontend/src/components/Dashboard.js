import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
    const [error,setError] = useState('');
    const {currentUser, logout } = useAuth();
    const history = useHistory();
    async function handleLogout(){
        setError('')
        try{
            await logout();
            history.push('/login');

        }catch{
            setError("Failed to Log Out")
        }

    }
    return (
        <div>
            <h2>Profile</h2>
            {error && <h3>{error}</h3>}
            <strong>Email: </strong>{currentUser.email}
            <button onClick={handleLogout}>Log Out</button>
            
        </div>
    )
}
