import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'

/*
https://javascript.plainenglish.io/multi-step-form-using-react-and-material-ui-29ff7f7cf049
change to switch case based on activeStep
render separate components for each stage of the form
*/

const steps = ["Company or Student?", "Register", "Confirm Details"]
let isStudent = false

export default function RegisterForm() {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if(activeStep === steps.length) {
            handleUserRegister(user);
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleLogin = () => {
        setActiveStep(0);
        navigate("/login");
    }

    const handleUserRegister = (user) => {
        
    }

    let user = {
        "username": "",
        "password": "",
        "role": ""
    }

    return (
        <Box sx={{ padding: 4 }}>
            <h2>Register for an account!</h2>
            <Stepper activeStep={activeStep} sx={{ marginTop: 3 }}>
                {steps.map((label, index) => {
                    const stepProps = {}
                    const labelProps = {}
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt:2, mb:1 }}>
                        All steps completed
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleLogin}>Login</Button>
                    </Box>
                </React.Fragment>
            ) :(
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )
}
