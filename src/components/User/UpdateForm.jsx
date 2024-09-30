import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Button, Grid2, IconButton } from '@mui/material'
import { Clear } from '@mui/icons-material'
import Input from '../ui/Input'
import PwdInput from '../ui/PwdInput'

const UpdateForm = ({ formType, closeModal }) => {
    const { user, userErrors, updateAccount, updatePassword } = useAuth()
    const { register, handleSubmit, setValue } = useForm()
    const navigate = useNavigate()

    const onSubmitInfo = handleSubmit(async user => {
        const userUpdated = await updateAccount(user)
        if (userUpdated) { 
            Swal.fire({
                title: 'ÉXITO',
                text: 'Datos actualizados!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                closeModal()
            })
        } else {
            console.log('error')
        }
    })

    const onSubmitPwd = handleSubmit(async user => {
        const pwdUpdated = await updatePassword(user)
        if (pwdUpdated) {
            Swal.fire({
                title: 'Contraseña actualizada!',
                text: 'Se cerrará sesión y deberás iniciar de nuevo con tu nueva contraseña',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                localStorage.removeItem('auth_token')
                navigate('/')
            })
        } else {
            console.log('error')
        }
    })

    useEffect(() => {
        if (user && formType === 'profile') {
            setValue('first_name', user.first_name)
            setValue('last_name', user.last_name)
            setValue('nickname', user.nickname)
            setValue('email', user.email)
        }
    }, [user, formType, setValue])

    return (
        <div>
            <div className='fixed top-4 right-4 flex flex-col space-y-2 z-50'>
                {userErrors.map((error, index) => (
                    <div key={index}
                        className='bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-out'
                        style={{ animationDelay: `${index * 0.25}s` }}
                    >
                        <div className="flex justify-between items-center">
                            <span>{error}</span>
                        </div>
                    </div>
                ))}
            </div>
            <IconButton sx={{
                bgcolor: 'red',
                color: 'white',
                '&:hover': {
                    bgcolor: 'lightpink',
                    color: 'black'
                }
            }}
                onClick={closeModal}
            >
                <Clear />
            </IconButton>
            {formType === 'profile' && (
                <form onSubmit={onSubmitInfo}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <Input id='first_name' label='Nombres' register={register} />
                        </Grid2>
                        <Grid2 size={6}>
                            <Input id='last_name' label='Apellidos' register={register} />
                        </Grid2>
                        <Grid2 size={6}>
                            <Input id='nickname' label='Nombre de Usuario' register={register} />
                        </Grid2>
                        <Grid2 size={6}>
                            <Input id='email' label='Correo electrónico' register={register} type='email' />
                        </Grid2>
                        <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Button variant='contained' type='submit'>Actualizar Perfil</Button>
                        </Grid2>
                    </Grid2>
                </form>
            )}

            {formType === 'password' && (
                <form onSubmit={onSubmitPwd}>
                    <Grid2 container spacing={2} sx={{ width: '250px', mt: 1 }}>
                        <Grid2 container>
                            <PwdInput id='current_password' label='Contraseña Anterior' register={register} />
                        </Grid2>
                        <Grid2 container>
                            <PwdInput id='password' label='Nueva Contraseña' register={register} />
                        </Grid2>
                        <Grid2 container>
                            <PwdInput id='confirm_password' label='Confirmar Nueva Contraseña' register={register} />
                        </Grid2>
                    </Grid2>
                    <button>Actualizar</button>
                </form>
            )}

        </div>
    )
}

UpdateForm.propTypes = {
    formType: PropTypes.oneOf(['profile', 'password']).isRequired,
    closeModal: PropTypes.func.isRequired
}

export default UpdateForm