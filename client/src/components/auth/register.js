//template from https://github.com/mui/material-ui/tree/master/docs/data/material/getting-started/templates/sign-up

import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import axios from 'axios'
import { useState } from 'react'
import Info from '../sub_components/info.js'

const Register = () => {



    const [form_errors, set_form_errors] = useState({username: false, email: false, password: false}) //used for the error prop on mui textfield
    const [info, set_info] = useState(null)
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        set_info(null)
        set_form_errors(Object.keys(form_errors).map(v => form_errors[v] = false)) //reset all form_errors values to false
        const data = new FormData(event.currentTarget)
        // eslint-disable-next-line no-console
        const req_data = {
            mail: data.get('email'),
            username: data.get('username'),
            password: data.get('password'),
            comfirm_password: data.get('confirm_password')
        }

        if (req_data.password != req_data.comfirm_password) {
            set_info({type: 'error', message: `passwords aren't matching`})
            return set_form_errors({...form_errors, password: true})
        }

        try {
            let res = await axios.post('/auth/register', req_data)
            return set_info({type: 'success', message: res.data.message})
        } catch (err) { //set diff types of error
            set_info({type: 'error', message: err.response.data.error})
            return set_form_errors({...form_errors, username: true, password: true})
        }
            
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Register
            </Typography>
            <Box component="form" noValidate onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    error={form_errors.username}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    error={form_errors.email}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={form_errors.password}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    id="confirm_password"
                    error={form_errors.password}
                />
                </Grid>
                {info ? 
                    <Grid item xs={12}>
                        <Info type={info.type} text={info.message}/>
                    </Grid>
                    :
                    null
                }
                <Grid item xs={12}>
                <Typography variant="body2">By creating an account you acknowledge that you have read and agree to the <Link href="#">Terms of Service</Link></Typography>
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Register
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="#" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
    )
}

export default Register