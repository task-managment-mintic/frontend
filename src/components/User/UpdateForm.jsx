import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, Grid2, IconButton } from '@mui/material'
import { Clear } from '@mui/icons-material'
import { useAuthHandler } from '../../hooks/useAuthHandler'
import { Input, PwdInput } from '../ui'

const UpdateForm = ({ formType, closeModal }) => {
    const { user } = useAuth()
    const { updateUserProfile, updateUserPassword } = useAuthHandler()
    const { register, handleSubmit, setValue } = useForm()
    const navigate = useNavigate()

    const onSubmitInfo = handleSubmit(async user => {
        await updateUserProfile(user, closeModal)
    })

    const onSubmitPwd = handleSubmit(async user => {
        await updateUserPassword(user, navigate)
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
                    <Grid2 container spacing={2} sx={{ width: '270px', mt: 1 }}>
                        <Grid2>
                            <PwdInput id='current_password' label='Contraseña Anterior' register={register} />
                        </Grid2>
                        <Grid2>
                            <PwdInput id='password' label='Nueva Contraseña' register={register} />
                        </Grid2>
                        <Grid2>
                            <PwdInput id='confirm_password' label='Confirmar Nueva Contraseña' register={register} />
                        </Grid2>
                        <Grid2>
                            <Button variant='contained' type='submit'>Actualizar</Button>
                        </Grid2>
                    </Grid2>
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