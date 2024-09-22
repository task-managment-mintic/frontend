import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Alert, Box, Button, Grid2, Typography } from '@mui/material'
import Input from '../ui/Input'
import PwdInput from '../ui/PwdInput'

const LoginForm = ({ openRegister }) => {
    const { userErrors, signIn } = useContext(AuthContext)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async user => {
        const signInRes = await signIn(user)
        if (signInRes) {
            Swal.fire({
                title: 'Bienvenido/a!',
                text: 'Has ingresado con éxito a la aplicación',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                navigate('/home')
            })
        }
    })

    return (
        <div>  
            <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
                {userErrors && (
                    <Alert severity='error'
                        style={{ animationDelay: '0.25s' }}
                        className='animate-fade-out'
                    >
                        {userErrors}
                    </Alert>
                )}
            </div>
            <Box sx={{ flexGrow: 1, maxWidth: '400px', margin: '0 auto', padding: '10px' }}>
                <form onSubmit={onSubmit}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <Typography variant='h5' alignt='center'>
                                INICIAR SESIÓN
                            </Typography>
                        </Grid2>

                        <Grid2 size={12}>
                            <Input id='logger' label='Nombre de Usuario o Correo' register={register} />
                        </Grid2>

                        <Grid2 size={12}>
                            <PwdInput id='password' label='Contraseña' register={register} />
                        </Grid2>
                        
                        <Grid2 size={12}
                            fullWidth
                            sx={{
                                display: 'flex',
                                marginTop: '10px',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Button variant='contained'
                                type='submit'
                                fullWidth
                                sx={{
                                    marginBottom: '10px',
                                    width: '300px'
                                }}
                            >
                                Iniciar Sesión
                            </Button>
                            <Button variant='text'
                                onClick={openRegister}
                                sx={{
                                    width: '200px',
                                    fontSize: '0.75rem'
                                }}
                            >   
                                No tienes una cuenta? Crea una!
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </Box>
        </div>
    )
}

LoginForm.propTypes = {
    openRegister: PropTypes.func.isRequired
}

export default LoginForm