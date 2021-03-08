import React from 'react'
import { TextField, Grid} from '@material-ui/core';


export default function emergencyContactForm() {
    return (
        <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>

                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.relationFirstNameRef}
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.relationLastNameRef}
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        />
                </Grid>
                <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Contact No."
                            fullWidth
                            type="tel"
                            // ref={inputState.relationPhoneRef}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.relationRef}
                        id="relation"
                        label="Relation"
                        name="relation"
                        />
                </Grid>
            </Grid>
    )
}
