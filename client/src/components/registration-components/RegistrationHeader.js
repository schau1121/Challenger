import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function RegistrationHeader(props) {
  return (
    <>
        <h2>Register for an account!</h2>
        <Stepper activeStep={props.activeStep} sx={{ marginTop: 3 }}>
            {props.steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    </>
  )
}
