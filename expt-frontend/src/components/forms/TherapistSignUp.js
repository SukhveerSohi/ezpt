import React, {useRef, useState} from 'react';
import axios from 'axios';
import {addAccount} from '../../database';
import { Button, FormControlLabel,Checkbox, TextField, Typography, Grid, StepLabel } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import AddressForm from './AddressForm.js';
import PersonalDetailForm from './PersonalDetailForm';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import {useStepperFormStyles} from '../../styles/StepperFormStyle';


function ProfessionalDetailForm({inputState,inputStateFunc}){
    const handleEmploymentChange = (event) => {
        inputStateFunc.setEmploymentType(event.target.value);
      };
    const handleDateChange = (Date) => {
        inputStateFunc.setRegistDate(Date);
    };
    return(
        <>
            <Typography variant="h6" gutterBottom>
                Professional Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TextField
                            variant="outlined"
                            required
                            id="registNumber"
                            name="registNumber"
                            label="Registration No."
                            fullWidth
                            type="tel"
                            // ref={phoneRef}
                />
                </Grid>
                <Grid item xs={12}>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Employement type</FormLabel>
                        <RadioGroup aria-label="employmentType" name="employmentType" value={inputState.employmentType} onChange={handleEmploymentChange} row>
                            <FormControlLabel value="full-time" control={<Radio />} label="full-time" />
                            <FormControlLabel value="casual" control={<Radio />} label="casual" />
                            <FormControlLabel value="self-employed" control={<Radio />} label="self-employed" />
                        </RadioGroup>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                        <KeyboardDatePicker
                            disableToolbat
                            variant="inline"
                            format="MM/dd/yyyy"
                            id="date-of-regist"                            
                            label="Registration Date"
                            value={inputState.registDate}
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
const steps = ['Personal details', 'Professional details', 'Address'];

export default function PatientSignUp(){
    
    const type = "therapist";

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const [dateOfBirth,setDateOfBirth] = useState(new Date());
    const [contactPreference,setContactPreference] = useState('email');
    const [gender,setGender] = useState('male');
    const registNumberRef = useRef();
    const [employmentType,setEmploymentType] = useState('full-time');
    const [registDate, setRegistDate] = useState(new Date());


    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const [activeStep, setActiveStep] = React.useState(0);
    const formStep = useRef();

    function getStepContent(step){
        switch(step){
            case 0:
                return <PersonalDetailForm inputState={{
                    firstNameRef:firstNameRef,
                    lastNameRef:lastNameRef,
                    emailRef:emailRef,
                    phoneRef:phoneRef,
                    gender:gender,
                    dateOfBirth:dateOfBirth,
                    contactPreference:contactPreference,
                }} inputStateFunc={{
                    setDateOfBirth:setDateOfBirth,
                    setContactPreference:setContactPreference,
                    setGender:setGender
                }}/>
            case 1:
                return <ProfessionalDetailForm inputState={{
                    registNumberRef:registNumberRef,
                    employmentType:employmentType,
                    registDate:registDate
                    }}
                    inputStateFunc={{
                    setEmploymentType:setEmploymentType,
                    setRegistDate:setRegistDate
                    }}
                    />
            case 2:
                return <AddressForm />
            default:
                return;
        }
    }
    const handleNext = (e) => {
        if (formStep.current.checkValidity()) {    
            if(activeStep<=2){
                setActiveStep(activeStep + 1);
                e.preventDefault();
            }else{
                handleSubmit();
            }
        }
    };
    
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function handleSubmit(){
        // e.preventDefault()
        setError('');
        setLoading(true);
        let Data=JSON.stringify({
            firstName:firstNameRef.current.value,
            lastName:lastNameRef.current.value,
            email:emailRef.current.value,
            phone:phoneRef.current.value,
            gender:gender,
            dataOfBirth:dateOfBirth,
            contactPreference:contactPreference,
        })

        addAccount(type,Data)
        .then(function (response){
            if(response=='success'){
                console.log(response);
            }else{
                setError(response);
            }
            setLoading(false);
        });
    }

    const classes = useStepperFormStyles();

    return(
        <main className={classes.layout}>
            <div className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">Add Therapist</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label)=>(
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                    }
                </Stepper>
                {error && <Typography variant="subtitle1" color="Secondary">{error}</Typography>}
                <form action="/" method="POST" ref={formStep}>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                        {
                            activeStep !==0 && (
                                <Button onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>
                            )
                        }
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            type="submit"
                            className={classes.button}
                        >
                            {activeStep===steps.length-1? 'Sign Up': 'Next'}
                        </Button>
                    </div>
                </form>
                
            </div>

        </main>
    )
}