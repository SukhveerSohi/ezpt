import React from 'react'
import { TextField, Grid} from '@material-ui/core';

export default function EvaluationForm() {
    return (
        <>
            {/* <Typography variant="h6" gutterBottom>Evaluation</Typography> */}

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.relationFirstNameRef}
                        id="patientCurrentState"
                        label="Patient Current State"
                        name="patientCurrentState"
                        autofocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.relationFirstNameRef}
                        id="previousTreatment"
                        label="Previous Treatment"
                        name="previousTreatment"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.relationFirstNameRef}
                        id="pastActivities"
                        label="Past Activities"
                        name="pastActivities"
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.relationFirstNameRef}
                        id="patientRecoveryGoal"
                        label="Patient Recovery Goals"
                        name="patientRecoveryGoal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.relationFirstNameRef}
                        id="therapyName"
                        label="Therapy to use"
                        name="therapyName"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.relationFirstNameRef}
                        id="therapySignupReason"
                        label="Therapy Signup Reason"
                        name="therapySignupReason"
                        row={2}
                    />
                </Grid>
                
            </Grid>
            
        </>
    )
}
