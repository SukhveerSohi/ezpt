/*  PrivateRoute.js to encapsulate dashboard 
    to make sure only loged in users be able to access dashboard page.*/

import React from 'react'
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext.js';
export default function PrivateRoute({component: Component,path, ...rest}) {
    const {currentUser} = useAuth();
    return (
        <Route
            path={path}
            {...rest}
            render={props=>{
                if(currentUser.firebaseUser){
                    switch(path){
                        case '/addPatient':
                            return currentUser.type='therapist'?<Component {...props}/>:<Redirect to="/login"/>
                            break;
                        case '/addTherapist':
                            return currentUser.type='admin'?<Component {...props}/>:<Redirect to="/login"/>
                            break;
                        // case '/addClinic':
                    
                        default:
                            return <Component {...props}/>;
                    }
                }else{
                    return <Redirect to="/login"/>
                }
                // currentUser.firebaseUser? <Component {...props}/>:<Redirect to="/login"/>
            }}>
            
        </Route>
    )
}
