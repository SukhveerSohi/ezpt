import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
export default function(){

    return(
        <>
            <div>
                <img src={process.env.PUBLIC_URL+"/avatar.jpg"} height="250" width="250"/>
                <div>
                    <div style={{"height":"250", "width":"250"}}><Link to="/patient">Patient 1</Link></div>
                    <div style={{"height":"250", "width":"250"}}><Link to="/patient">Patient 2</Link></div>
                    <div style={{"height":"250", "width":"250"}}><Link to="/patient">Patient 3</Link></div>
                    <div style={{"height":"250", "width":"250"}}><Link to="/patient">Patient 4</Link></div>
            
                </div>
                <div>
                    <Link to="/addPatient"><button>Add Patient</button></Link>
                </div>
            </div>

        </>
    )

}