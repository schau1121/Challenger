import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import CompanyStudentRadioBtns from './registration-components/CompanyStudentRadioBtns';
import RegistrationHeader from './registration-components/RegistrationHeader';
import FormComponent from './registration-components/FormComponent';

/*
https://javascript.plainenglish.io/multi-step-form-using-react-and-material-ui-29ff7f7cf049
change to switch case based on activeStep
render separate components for each stage of the form

for future me:
create a component where you can pass in another component
<RegisterStep component={Component} stepHandler={stepHandler} radioHandler={radioHandler} userHandler={userHandler} />

maybe we can store the child components in an array where the index represents the step
(if we pass in an array, does it copy the elements or just store a reference/address? memory efficient?)
*/

export default function RegisterForm() {
    let user = {}
    const steps = ["Company or Student?", "Register", "Confirm Details"]
    
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)
    const [isStudent, setIsStudent] = useState("true")
    const [username, setUsername] = useState("")
    const [pwd, setPwd] = useState("")
    const [email, setEmail] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [companyDesc, setCompanyDesc] = useState("")
    const [invalidPwd, setInvalidPwd] = useState(false)
    const [success, setSuccess] = useState(null)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePwdChange = (e) => {
        setPwd(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleVerifyPassword = (e) => {
        if(e.target.value != pwd) {
        setInvalidPwd(true)
        } else {
        setInvalidPwd(false)
        }
    }

    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value)
    }

    const handleCompanyDescChange = (e) => {
        setCompanyDesc(e.target.value)
    }
    
    const handleNext = () => {
        if(!invalidPwd && pwd !== "") {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
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

    const handleUserRegister = async () => {
        user["username"] = username
        user["password"] = pwd
        if(isStudent) {
            user["email"] = email
        } else {
            user["company_name"] = companyName
            user["company_description"] = companyDesc
        }

        console.log(user)
        //while waiting for post, loading animation??
        //post request to /api/register
        //if error, setSucess = false, setError = error.message
        //trigger useEffect = () => {
        //    if !sucess : step = 1
        //    alert(error)
        //}, [sucess]
    }

    const handleIsStudent = (e) => {
        //console.log(e.target.value)
        setIsStudent(e.target.value)
        isStudent === "true" ? (user["role"] = "student") : (user["role"] = "company")
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
        return(
            <Box sx={{ padding: 4 }}>
                <RegistrationHeader activeStep={activeStep} steps={steps} />
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 2 }}>Step {activeStep + 1}</Typography>
                    <FormComponent 
                        isStudent={isStudent} 
                        invalidPwd={invalidPwd}
                        confirm={false}
                        handleEmailChange={handleEmailChange}
                        handleUsernameChange={handleUsernameChange}
                        handlePwdChange={handlePwdChange}
                        handleVerifyPassword={handleVerifyPassword}
                        handleCompanyNameChange={handleCompanyNameChange}
                        handleCompanyDescChange={handleCompanyDescChange}
                    />
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
    } else {
        //return student or company registration form with text fields disabled to confirm
        return (
            <Box sx={{ padding: 4 }}>
                <RegistrationHeader activeStep={activeStep} steps={steps} />
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 2 }}>Step {activeStep + 1}</Typography>
                    
                    <Typography sx={{ mt: 2, mb: 2 }}>Are you sure you'd like to submit?</Typography>

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
    }
}
