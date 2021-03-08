import React, {useRef, useReducer, useState} from 'react';
import axios from 'axios';
import {addAccount} from '../../database';

import { Button, FormControlLabel,Checkbox, TextField, Typography, Grid, StepLabel } from '@material-ui/core';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import AddressForm from './AddressForm.js';
import PersonalDetailForm from './PersonalDetailForm';
import MedicalDetailForm from './MedicalDetailForm';

import {useStepperFormStyles} from '../../styles/StepperFormStyle';

const steps = ['Personal details', 'Medical details', 'Address'];
const initialMedicalState=
{
    injuries:[],
    surgeries:[{id:9232,name: "wer", bodyPart: "qwerty", description: "qwerty",date:"3/4/2021"}],
    allergies:[],
    comorbidities:[],
    otherConditions:[],
    previousDiagnoses:[],
    previousMedications:[]

}
const ACTIONS={
    ADD_INJURY:'add_injury',
    ADD_SURGERY:'add_surgery',
    ADD_ALLERGY:'add_allergy',
    ADD_COMORBIDITY:'add_comorbidity',
    ADD_CONDITION:'add_condition',
    ADD_DIAGNOSE:'add_diagnose',
    ADD_MEDICATION:'add_medication',

    REMOVE_INJURY:'remove_injury',
    REMOVE_SURGERY:'remove_surgery',
    REMOVE_ALLERGY:'remove_allergy',
    REMOVE_COMORBIDITY:'remove_comorbidity',
    REMOVE_CONDITION:'remove_condition',
    REMOVE_DIAGNOSE:'remove_diagnose',
    REMOVE_MEDICATION:'remove_medication'
}

function reducer(medicalState,action){
    switch(action.type){
        case ACTIONS.ADD_INJURY:
            return medicalState.injuries.push(action.payload.injury);
        case ACTIONS.REMOVE_INJURY:
            return medicalState.injuries.filter(injury=>injury.id !== action.payload.id);
        case ACTIONS.ADD_SURGERY:
            return {...medicalState,surgeries:[...medicalState.surgeries,action.payload.surgery]};
            console.log(medicalState);
            break;
        case ACTIONS.REMOVE_SURGERY:
            return {...medicalState,surgeries:medicalState.surgeries.filter(surgery=>surgery.id !== action.payload.id)};
    }
}
export default function PatientSignUp(){
    
    const type = "patient";

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const genderRef = useRef();
    const dateOfBirthRef = useRef();
    const contactPreferenceRef = useRef();
    const emergencyContactNameRef = useRef();
    const emergencyContactPhoneRef = useRef();
    const emergencyContactRelationRef = useRef();
    const dateOfInjuryRef = useRef();
    const dateOfSurgeryRef = useRef();
    const medicalHistoryRef = useRef();
    const allergiesRef = useRef();
    const medicationsRef = useRef();
    const diagnosesRef = useRef();
    const comorbiditiesRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const [activeStep, setActiveStep] = React.useState(0);
    const formStep = useRef();


    const [medicalState, dispatch] = useReducer(reducer, initialMedicalState)

    function getStepContent(step){
        switch(step){
            case 0:
                return <PersonalDetailForm inputState={{
                    firstNameRef:firstNameRef,
                    lastNameRef:lastNameRef,
                    emailRef:emailRef,
                    phoneRef:phoneRef,
                    // gender:gender,
                    // dateOfBirth:dateOfBirth,
                    // contactPreference:contactPreference,
                }} inputStateFunc={{
                    // setDateOfBirth:setDateOfBirth,
                    // setContactPreference:setContactPreference,
                    // setGender:setGender
                }}/>
            case 1:
                // const data={...medicalState};
                // console.log(medicalState.surgeries);
                return <MedicalDetailForm medicalStateData={medicalState} dispatch={dispatch}/>
            case 2:
                return <AddressForm />
            default:
                return;
        }
    }
     function handleSubmit(e){
        e.preventDefault();
        setError('');
        setLoading(true);
        let Data = JSON.stringify({
            firstName:firstNameRef.current.value,
            lastName:lastNameRef.current.value,
            email:emailRef.current.value,
            phone:phoneRef.current.value,
            gender:genderRef.current.value,
            dataOfBirth:dateOfBirthRef.current.value,
            contactPreference:contactPreferenceRef.current.value,
            emergencyContactName:emergencyContactNameRef.current.value,
            emergencyContactPhone:emergencyContactPhoneRef.current.value,
            emergencyContactRelation:emergencyContactRelationRef.current.value,
            dateOfInjury:dateOfInjuryRef.current.value,
            dateOfSurgery:dateOfSurgeryRef.current.value,
            medicalHistory:medicalHistoryRef.current.value,
            allergies:allergiesRef.current.value,
            medications:medicationsRef.current.value,
            diagnoses:diagnosesRef.current.value,
            comorbidities:comorbiditiesRef.current.value,
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
        // console.log(returnState)

        // if(returnState === 'success'){
        //     return(<div>Done</div>)

        // }else{
        //     setError(returnState)
        // }
        
    }
    const handleNext = (e) => {
        // if (formStep.current.checkValidity()) {    
            if(activeStep<=2){
                setActiveStep(activeStep + 1);
                e.preventDefault();
            }else{
                handleSubmit();
            // }
        }
    };
    
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const classes = useStepperFormStyles();

    return(
        <main className={classes.layout}>
            <div className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">Add Patient</Typography>
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
                        {/* {console.log(medicalState)}
                        <button onClick={()=>dispatch({type:'add_surgery',payload:{surgery:{name: "wer", bodyPart: "qwerty", description: "qwerty"}}})}>sdsd</button> */}

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
                {/* <form onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input type="text" ref={firstNameRef} required/>
                    <label>Last Name</label>
                    <input type="text" ref={lastNameRef} required/>
                    <label>Email</label>
                    <input type="email" ref={emailRef} required/>
                    <label>Phone</label>
                    <input type="tel" ref={phoneRef} pattern="\d*" required/>
                    <hr/>
                    <label>Contact Preference</label>
                    <input type="radio" id="email" name="contactPreference" ref={contactPreferenceRef} value="email"/>
                    <label htmlFor="email">Email</label>
                    <input type="radio" id="phone" name="contactPreference" ref={contactPreferenceRef} value="phone"/>
                    <label htmlFor="phone">Phone</label>    
                    <hr/>
                    <label>Emergency Contact</label>
                    <label>Name</label>
                    <input type="text" ref={emergencyContactNameRef} />
                    <label>Phone</label>
                    <input type="tel" ref={emergencyContactPhoneRef} />
                    <label>Relation</label>
                    <input type="text" ref={emergencyContactRelationRef} />
                    <hr/>
                    <label>Gender</label>
                    <input type="radio" id="male" name="gender" ref={genderRef} value="male"/>
                    <label htmlFor="male">Male</label>
                    <input type="radio" id="female" name="gender" ref={genderRef} value="female"/>
                    <label htmlFor="female">Female</label>
                    <input type="radio" id="other" name="gender" ref={genderRef} value="non-binary"/>
                    <label htmlFor="other">Non-Binary</label>
                    <input type="radio" id="other" name="gender" ref={genderRef} value="rather-not-say"/>
                    <label htmlFor="other">Rather Not Say</label>
                    <hr/>
                    <label>Date of Birth</label>
                    <input type="date" ref={dateOfBirthRef} />
                    <label>Date of Injury</label>
                    <input type="date" ref={dateOfInjuryRef} />
                    <label>Date of Surgery</label>
                    <input type="date" ref={dateOfSurgeryRef} />
                    <hr/>
                    <label>Past Medical History/Surgeries</label>
                    <textarea ref={medicalHistoryRef}/>
                    <label>Allergies</label>
                    <textarea ref={allergiesRef}/>
                    <label>Medications</label>
                    <textarea ref={medicationsRef}/>
                    <label>Diagnoses</label>
                    <textarea ref={diagnosesRef}/> 
                    <label>Comorbidities</label>
                    <textarea ref={comorbiditiesRef}/>
                    <hr/> */}
                    {/* <label>Current Activity</label>
                    <textarea ref={currentActivityRef} required/>
                    <label>Exercises</label>
                    <textarea ref={exercisesRef} required/>
                    <hr/> */}

                    {/* <button disabled={loading} type="submit">Sign Up</button>

                </form> */}
            </div>

        </main>
    )
}