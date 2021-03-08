/* AuthContext.js makes use of React createContext to manage entities 
    like currentUser that is required throughout the application*/
import React, {useState, useContext, useEffect} from 'react';
import {auth} from '../firebase';

// creating context object
const AuthContext = React.createContext()

// exporting the context object
export function useAuth(){
    return useContext(AuthContext)
}

// exporting Context Provider Component
export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState({});

    // check if the authentication process is finished
    const [currentUserProfile, setCurrentUserProfile] = useState({});
    
    const [loading, setLoading] = useState(true);

    // Auth Functions
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email,password,accountType){
        setCurrentUser({...currentUser,type:accountType});
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logout(){
        return auth.signOut()
    }
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    //get user data from ezpt database
    function getUserProfile(accountType){
        
        // setCurrentUser({...currentUser, type:accountType});
    }


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser({...currentUser,firebaseUser:user});
            setLoading(false);

        })
        return unsubscribe;
    },[])
    
    // making the methods accessible thoughout the app
    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
