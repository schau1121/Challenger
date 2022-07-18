import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormComponent(props) {
  if(props.isStudent === "true") {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '40ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="username-input"
          label="Username"
          type="username"
          onChange={props.handleUsernameChange}
        />
        <TextField
          required
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={props.handlePwdChange}
        />
        {(props.invalidPwd) ? (
          <TextField
            required
            error
            id="verify-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            onChange={props.handleVerifyPassword}
            helperText="Passwords must match"
          />
        ) : (
          <TextField
            required
            id="verify-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            onChange={props.handleVerifyPassword}
          />
        )}
        <TextField
          id="email-input"
          label="Email Address"
          type="email"
          onChange={props.handleEmailChange}
        />
      </Box>
    )
  } else {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '40ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="username-input"
          label="Username"
          type="username"
          onChange={props.handleUsernameChange}
        />
        <TextField
          required
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={props.handlePwdChange}
        />
        {(props.invalidPwd) ? (
          <TextField
            required
            error
            id="verify-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            onChange={props.handleVerifyPassword}
            helperText="Passwords must match"
          />
        ) : (
          <TextField
            required
            id="verify-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            onChange={props.handleVerifyPassword}
          />
        )}
        <TextField
          required
          id="company-name-input"
          label="Company Name"
          onChange={props.handleCompanyNameChange}
        />
        <TextField
          multiline
          rows={4}
          id="company-desc-input"
          label="Company Description"
          onChange={props.handleCompanyDescChange}
        />
      </Box>
    )
  }
}
