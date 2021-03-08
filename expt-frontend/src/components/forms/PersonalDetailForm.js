import React from 'react';
import { Button, FormControlLabel,Checkbox, TextField, Typography, Grid, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function PersonalDetailForm({inputState,inputStateFunc}) {

    
    const handleContactPreferenceChange = (event) => {
        inputStateFunc.setContactPreference(event.target.value);
      };
    
    const handleGenderChange = (event) => {
        inputStateFunc.setGender(event.target.value);
      };
    const handleDateChange = (Date) => {
        inputStateFunc.setDateOfBirth(Date);
    };
    

    return (
        <>

                <Typography variant="h6" gutterBottom>Personal Detail</Typography>
                {/* {error && <Typography variant="subtitle1" color="Secondary">{error}</Typography>}
                <form className={classes.form} onSubmit={handleSubmit}> */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        ref={inputState.firstNameRef}
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
                        ref={inputState.lastNameRef}
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        fullWidth
                        type="email"
                        ref={inputState.emailRef}
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
                            ref={inputState.phoneRef}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Contact Preference</FormLabel>
                            <RadioGroup aria-label="contactPreference" name="contactPreference" value={inputState.contactPreference} onChange={handleContactPreferenceChange} row>
                                <FormControlLabel value="email" control={<Radio />} label="Email" />
                                <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                            </RadioGroup>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={inputState.gender} onChange={handleGenderChange} row>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="non-binary" control={<Radio />} label="Non-Binary" />
                            <FormControlLabel value="rather-not-say" control={<Radio />} label="Rather Not Say" />
                        </RadioGroup>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                        <KeyboardDatePicker
                            disableToolbat
                            variant="inline"
                            format="MM/dd/yyyy"
                            id="date-of-birth"                            
                            label="Date of Birth"
                            value={inputState.dateOfBirth}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    
                    </Grid>

                {/* </form> */}

        </>
    )
}
