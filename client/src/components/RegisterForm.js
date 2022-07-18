import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'
import CompanyStudentRadioBtns from './registration-components/CompanyStudentRadioBtns';
import RegistrationHeader from './registration-components/RegistrationHeader';

/*
https://javascript.plainenglish.io/multi-step-form-using-react-and-material-ui-29ff7f7cf049
change to switch case based on activeStep
render separate components for each stage of the form
*/

const steps = ["Company or Student?", "Register", "Confirm Details"]

export default function RegisterForm() {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)
    const [isStudent, setIsStudent] = useState("true")
    
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

    const handleIsStudent = (e) => {
        //console.log(e.target.value)
        setIsStudent(e.target.value)
        isStudent === "true" ? (user["role"] = "student") : (user["role"] = "company")
    }

    let user = {
        "username": "",
        "password": "",
        "role": ""
    }

    if(activeStep === steps.length) {
        return (
            <Box sx={{ padding: 4 }}>
                <RegistrationHeader activeStep={activeStep} steps={steps} />
                <React.Fragment>
                    <Typography sx={{ mt:2, mb:1 }}>
                        All steps completed
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleLogin}>Login</Button>
                    </Box>
                </React.Fragment>
            </Box>
        )
    } else if (activeStep === 0) {
        return (
            <Box sx={{ padding: 4 }}>
                <RegistrationHeader activeStep={activeStep} steps={steps} />
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 2 }}>Step {activeStep + 1}</Typography>
                    <CompanyStudentRadioBtns handler={handleIsStudent}/>
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
            </Box>
        )
    } else if (activeStep === 1) {
        //return student or company registration form based on isStudent
    } else {
        //return student or company registration form with text fields disabled to confirm
    }
}
