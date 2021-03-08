import { Container,Button } from '@material-ui/core'
import React, {useRef, useState}from 'react'
import SurgeryForm from './SurgeryForm';
import { useStepperFormStyles } from '../../styles/StepperFormStyle.js';
import SurgeryCard from './SurgeryCard.js';

export default function SurgeryContainer({surgeries, dispatch}) {
    const formRef= useRef();
    const [showForm, setShowForm] = useState(false);
    const [formState, setFormState] = useState({})

    const handleAddForm=()=>{
        setShowForm(true);
    }
    const hideForm=()=>{
        setShowForm(false);
    }
    const handleChange=(e)=>{
        setFormState({...formState,name:e.target.value});
    }
    const editSurgery = (id)=>{
        
        setFormState(surgeries.filter(surgery=>surgery.id=id)[0]);
        setShowForm(true);
        console.log(surgeries.filter(surgery=>surgery.id=id)[0])
    }

    const removeSurgery = (id)=>{
        dispatch({type:'remove_surgery', 
        payload:{id}})
    }
    const classes = useStepperFormStyles();

    return (
        <Container>
            {/* <Typography variant="h6" gutterBottom>Surgery</Typography> */}
            {surgeries.length>0 && 
            surgeries.map(surgery=>{
                return(
                    <SurgeryCard surgery={surgery} editSurgery={editSurgery} removeSurgery={removeSurgery}/>
                )
            })}
            {showForm && <SurgeryForm {...formState} hideForm={hideForm} handleChange={handleChange} dispatch={dispatch}  ref={formRef}/>}
            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddForm}
                    className={classes.button}
                >
                ADD
                    {/* {activeStep === steps.length-1? 'Sign Up' : 'Next'} */}
                </Button>
            </div>


        </Container>
    )
}
