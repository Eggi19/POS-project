import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import toast, { Toaster } from 'react-hot-toast';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from 'react';
import { registerUser } from '../../API/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate()
    const localRole = localStorage.getItem('role')

    if (localRole !== 'admin') { navigate('/products') }

    const _username = useRef()
    const _password = useRef()
    const _confirmPassword = useRef()
    const [role, setRole] = useState('')


    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const username = _username.current.value
            const password = _password.current.value
            const confirmPassword = _confirmPassword.current.value

            const result = await registerUser({
                username,
                password,
                confirmPassword,
                role
            })

            _username.current.value = ''
            _password.current.value = ''
            _confirmPassword.current.value = ''
            setRole('')

            if (result.data.success) {
                toast.success('Successfully Registered!')
            } else {
                throw { message: result.data.message }
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                    inputRef={_username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="Role"
                                    select
                                    name="Role"
                                    label="Role"
                                    helperText="Please select user role"
                                >
                                    <MenuItem value='Available' onClick={() => setRole('admin')}>
                                        Admin
                                    </MenuItem>
                                    <MenuItem value='Unavailable' onClick={() => setRole('cashier')}>
                                        Cashier
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    inputRef={_password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password confirmation"
                                    label="Password Confirmation"
                                    type="password"
                                    id="confirm-password"
                                    autoComplete="new-password"
                                    inputRef={_confirmPassword}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
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
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
