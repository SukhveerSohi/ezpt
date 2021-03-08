import React, {useRef, useState} from 'react'
import { Button, TextField, Grid} from '@material-ui/core';
import { useStepperFormStyles } from '../../styles/StepperFormStyle.js';

import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function SurgeryForm({name,bodyPart,description,date,hideForm,handleChange, dispatch}) {
    
    const surgeryNameRef = useRef();
    const bodyPartRef = useRef();
    const surgeryDescriptionRef = useRef();
    const surgeryDateRef = useRef(new Date());

    const handleAdd=()=>{
        hideForm();
        let surgery={id:Date.now(),
                    name:surgeryNameRef.current.value,
                    bodyPart:bodyPartRef.current.value,
                    description:surgeryDescriptionRef.current.value,
                    date:Date.now()}
        // console.log(surgery)
        dispatch({type:'add_surgery', 
        payload:{surgery}})
    }
    
    const handleDateChange = (Date) => {
        // inputStateFunc.setDateOfBirth(Date);
    };

    const classes = useStepperFormStyles();
    

    return (
        <>
            <Grid container spacing={3} style={{marginTop:'1em'}}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            inputRef={surgeryNameRef}
                            value={name}
                            id="surgeryName"
                            onChange={handleChange}
                            label="Surgery Name"
                            name="surgeryName"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            inputRef={bodyPartRef}
                            
                            value={bodyPart}

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
                            inputRef={surgeryDescriptionRef}
                            value={description}

                            id="surgeryDescription"
                            label="Description"
                            name="surgeryDescription"
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                        <KeyboardDatePicker
                            // disableToolbat
                            variant="inline"
                            format="MM/dd/yyyy"
                            id="surgeryDate"                            
                            label="Surgery Date"
                            value={date}
                            // inputRef={surgeryDateRef}

                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </MuiPickersUtilsProvider>
                    </Grid>

                </Grid>
                <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    className={classes.button}
                >
                Add Surgery
                    {/* {activeStep === steps.length-1? 'Sign Up' : 'Next'} */}
                </Button>
                </div>
            
            

    </>
    )
}
