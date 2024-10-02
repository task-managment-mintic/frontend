import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Box, Button, Grid2, Typography } from '@mui/material'
import Input from '../ui/Input'
import PwdInput from '../ui/PwdInput'
import { useAuthHandler } from '../../hooks/useAuthHandler'
import { useErrors } from '../../hooks/useErrors'
import ErrorDisplay from '../ui/ErrorDisplay'

const LoginForm = ({ openRegister }) => {
    const { userErrors } = useAuth()
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const { loginUser } = useAuthHandler()
    const { errors } = useErrors([userErrors])

    const onSubmit = handleSubmit(async user => {
        loginUser(user, navigate)
    })

    return (
        <div>
            {userErrors.length > 0 && <ErrorDisplay errors={errors} />}
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