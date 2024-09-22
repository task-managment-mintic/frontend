import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Alert, Box, Button, Grid2, Typography } from '@mui/material'
import PwdInput from '../ui/PwdInput'
import Input from '../ui/Input'

const RegisterForm = ({ openLogin }) => {
    const { userErrors, signUp } = useContext(AuthContext)
    const {
        register,
        handleSubmit
    } = useForm()

    const onSubmit = handleSubmit(async user => {
        console.log(user.confirm_password)
        const signUpResponse = await signUp(user)
        if (signUpResponse) {
            Swal.fire({
                title: 'ÉXITO',
                text: 'Tu cuenta ha sido creada con éxito, ahora debes iniciar sesión',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                openLogin()
            }) 
        }
    })

    return (
        <div>
            <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
                {userErrors.map((error, index) => (
                    <Alert key={index}
                        severity='error'
                        style={{ animationDelay: `${index * 0.25}s`, marginTop: '2px' }}
                        className='animate-fade-out'
                    >
                        {error}
                    </Alert>
                ))}
            </div>
            <Box sx={{ flexGrow: 1, maxWidth: '400px', margin: '0 auto', padding: '10px' }}>
                <form onSubmit={onSubmit}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <Typography variant='h5' align='center'>
                                Creación de Cuenta
                            </Typography>
                        </Grid2>

                        <Grid2 size={12}>
                            <Input id='first_name' label='Nombres' register={register} />
                        </Grid2>

                        <Grid2 size={12}>
                            <Input id='last_name' label='Apellidos' register={register} />
                        </Grid2>

                        <Grid2 size={12}>
                            <Input id='nickname' label='Nombre de Usuario' register={register} />
                        </Grid2>

                        <Grid2 size={12}>
                            <Input id='email' label='Correo Electrónico' register={register} type='email' />
                        </Grid2>

                        <Grid2 size={6}>
                            <PwdInput id='password' label='Contraseña' register={register} />
                        </Grid2>

                        <Grid2 size={6}>
                            <PwdInput id='confirm_password' label='Confirmar Contraseña' register={register}/>
                        </Grid2>

                        <Grid2 size={12}
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
                                Crear cuenta
                            </Button>
                            <Button variant='text'
                                onClick={openLogin}
                                sx={{
                                    width: '200px',
                                    fontSize: '0.875rem'
                                }}
                            >
                                Ya tengo una cuenta!
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </Box>
        </div>
    )
}

RegisterForm.propTypes = {
    openLogin: PropTypes.func.isRequired
}

export default RegisterForm