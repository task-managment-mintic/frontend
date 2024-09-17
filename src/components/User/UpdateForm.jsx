import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const UpdateForm = ({ formType, closeModal }) => {
    const { user, updateAccount } = useContext(AuthContext)
    const { register, handleSubmit, setValue } = useForm()

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
                <form>
                    <label htmlFor=''>Contraseña anterior</label>
                    <input type='password' />
                    <label htmlFor=''>Nueva contraseña</label>
                    <input type='password' />
                    <label htmlFor=''>Confirmar nueva contraseña</label>
                    <input type='password' />
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