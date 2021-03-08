import { TextField, Grid, Typography, StepLabel, Button } from '@material-ui/core';
import axios from 'axios';
import React, {useState, useRef} from 'react';
import {addAccount} from '../../database';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import AddressForm from './AddressForm.js';
import { useStepperFormStyles } from '../../styles/StepperFormStyle.js';


function AdminDetailForm(){
    return(
        <>
            <Typography variant="h6" gutterBottom>
                Admin Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        variant="outlined"
                        autoFocus
                        id="adminFirstName"
                        name="adminFirstName"
                        label="First Name"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        variant="outlined"
                        id="adminLastName"
                        name="adminLastName"
                        label="Last Name"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </>
    )
}

function CompanyDetailForm(){
    // function onHandleTelephoneChange(e){
    //     let phone=e.target.value
    //     if(phone===''|| /^[0-9\b]+$/.test(phone)){

    //     }
    // }
    
    return(
        <>
            <Typography variant="h6" gutterBottom>
                Company Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        variant="outlined"
                        autoFocus
                        id="companyName"
                        name="companyName"
                        label="Company Name"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        id="companyEmail"
                        name="companyEmail"
                        label="Email"
                        type="email"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        id="companyPhoneNumber"
                        name="companyPhoneNumber"
                        label="Contact No."
                        type="tel"
                        // onChange={onHandleTelephoneChange}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </>
    )
}

const steps = ['Company details', 'Address', 'Admin details'];

export default function CompanySignup(){

    const type = "company";

    const companyNameRef = useRef();
    const adminFirstNameRef = useRef();
    const adminLastNameRef = useRef();
    const companyEmailRef = useRef();
    const companyPhoneRef = useRef();
    const companyAddressStreetRef = useRef();
    const companyAddressCityRef = useRef();
    const companyAddressProvinceRef = useRef();
    const companyAddressCountryRef = useRef();
    const companyAddressPostalCodeRef = useRef();
    
    const formStep = useRef();
    const [error, setError] = useState('');
    const [loading,setLoading] = useState(false);
    
    const classes = useStepperFormStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    function getStepContent(step){
        switch(step){
            case 0:
                return <CompanyDetailForm />
            case 1:
                return <AddressForm />
            case 2:
                return <AdminDetailForm />
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
        // e.preventDefault();
        setError('');
        setLoading(true);
        let Data=JSON.stringify({
            companyName:companyNameRef.current.value,
            adminFirstName:adminFirstNameRef.current.value,
            adminLastName:adminLastNameRef.current.value,
            companyEmail:companyEmailRef.current.value,
            companyPhone:companyPhoneRef.current.value,
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

    return(
        <main className={classes.layout}>
            <div className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">Company Sign Up</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label)=>(
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {error && <h3>{error}</h3>}
            <form action="" method="POST" ref={formStep}>
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
                        {activeStep === steps.length-1? 'Sign Up' : 'Next'}
                    </Button>
                </div>
            </form>
                

            </div>
        </main>
    )
}