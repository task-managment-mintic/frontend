import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const UpdateForm = ({ formType, closeModal }) => {
    const { user, userErrors, updateAccount, updatePassword } = useContext(AuthContext)
    const { register, handleSubmit, setValue } = useForm()
    const navigate = useNavigate()

    const onSubmitInfo = handleSubmit(user => {
        const userUpdated = updateAccount(user)
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
            <button onClick={closeModal}>Cerrar</button>
            {formType === 'profile' && (
                <form onSubmit={onSubmitInfo}>
                    <label htmlFor='first_name'>Nombres</label>
                    <input type='text' id='first_name' {...register('first_name')} />

                    <label htmlFor='last_name'>Apellidos</label>
                    <input type='text' id='last_name' {...register('last_name')} />

                    <label htmlFor='nickname'>Nombre de Usuario</label>
                    <input type='text' id='nickname' {...register('nickname')} />

                    <label htmlFor='email'>Correo Electrónico</label>
                    <input type='email' id='email' {...register('email')} />

                    <button>Actualizar Perfil</button>
                </form>
            )}

            {formType === 'password' && (
                <form onSubmit={onSubmitPwd}>
                    <label htmlFor='current_password'>Contraseña anterior</label>
                    <input type='password' id='current_password' {...register('current_password')} />

                    <label htmlFor='password'>Nueva contraseña</label>
                    <input type='password' id='password' {...register('password')} />

                    <label htmlFor=''>Confirmar nueva contraseña</label>
                    <input type='password' id='confirm_password' {...register('confirm_password')} />

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