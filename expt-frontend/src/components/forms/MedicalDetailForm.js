import React from 'react'
import { Button, FormControlLabel,InputLabel,Checkbox, TextField, Typography, Grid, makeStyles } from '@material-ui/core';
import EmergencyContactForm from './emergencyContactForm'
import InjuryForm from './InjuryForm'
import SurgeryContainer from './SurgeryContainer'

export default function MedicalDetailForm({medicalStateData, dispatch}) {
    return (
        <>
            <Typography variant="h6" gutterBottom>Medical Detail</Typography>

            <Grid container spacing={3} style={{marginBottom:'3em'}}>
                <Grid item xs={12}>
                    <InputLabel>Emergency Contact Name</InputLabel>
                </Grid>
                <EmergencyContactForm/>

            </Grid>

            <Grid container spacing={3} style={{marginBottom:'3em'}}>
                <Grid item xs={12}>
                    <InputLabel>Injury</InputLabel>
                </Grid>
                <InjuryForm/>

            </Grid>
            
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <InputLabel >Surgery</InputLabel>
                </Grid>
                {console.log(medicalStateData.surgeries)}
                <SurgeryContainer surgeries={medicalStateData.surgeries} dispatch={dispatch}/>

            </Grid>

                    
            
        </>
    )
}
