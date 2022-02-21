//template from https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sign-in/SignIn.js

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import axios from 'axios'
import { useState, useEffect } from 'react'
import Info from '../sub_components/info.js'


const Login = () => { //todo: if user has a token cookie, test it and if available redirect to main page


    const [info, set_info] = useState(null)
    const [form_errors, set_form_errors] = useState({username: false, password: false}) //used for the error prop on mui textfield, not really useful for login but I keep it to have the same structure as register.js

    useEffect(async () => {
        try {
            let res = await axios.post('/auth/login') //logs the user in if he has a correct cookie
            console.log(res.data.message)
            //redirect to main page
        } catch(err) {
            return
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        set_info(null)
        set_form_errors(Object.keys(form_errors).map(v => form_errors[v] = false)) //reset all form_errors values to false
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        let req_data = {
            username: data.get('username'),
            password: data.get('password')
        }

        try {
            let res = await axios.post('/auth/login', req_data)
            return set_info({type: 'success', message: res.data.message}) //use redirect
        } catch (err) {
            set_info({type: 'error', message: err.response.data.error})
            return set_form_errors({username: true, password: true})
        }
    };

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
            Login
            </Typography>
            <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                error={form_errors.username}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={form_errors.password}
            />
            {info ? 
                <Grid item xs={12}>
                    <Info type={info.type} text={info.message}/>
                </Grid>
                :
                null
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Login
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link href="#" variant="body2">
                    {"Don't have an account?"}
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
  );
}

export default Login