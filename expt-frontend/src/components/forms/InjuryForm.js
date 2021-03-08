import React from 'react'
import { TextField, Grid} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function InjuryForm() {
    const handleDateChange = (Date) => {
        // inputStateFunc.setDateOfBirth(Date);
    };

    return (
        <>
            {/* <Typography variant="h6" gutterBottom>Injury</Typography> */}

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.NameRef}
                        id="injuryName"
                        label="Injury Name"
                        name="injuryName"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.NameRef}
                        id="bodyPart"
                        label="Body Part"
                        name="bodyPart"
                        
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.NameRef}
                        id="injuryDescription"
                        label="Description"
                        name="injuryDescription"
                        rows={3}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.NameRef}
                        id="injuryHistory"
                        label="History"
                        name="injuryHistory"
                        rows={3}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        // ref={inputState.NameRef}
                        id="affectedActivity"
                        label="Affected Activity"
                        name="affectedActivity"
                        rows={2}
                    />
                </Grid>
                <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <KeyboardDatePicker
                        disableToolbat
                        variant="inline"
                        format="MM/dd/yyyy"
                        id="injurydate"                            
                        label="Injury Date"
                        // value={inputState.dateOfBirth}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    </MuiPickersUtilsProvider>
                </Grid>

            </Grid>
            
        </>
    )
}
