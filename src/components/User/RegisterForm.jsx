import PropTypes from 'prop-types'
import useUserStore from '../../stores/useUserStore'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useState } from 'react'

const RegisterForm = ({ openLogin }) => {
    const [isMatch, setIsMatch] = useState(true)
    const { userErrors, signUp } = useUserStore()
    const {
        register,
        handleSubmit
    } = useForm()
    let errors = userErrors

    const onSubmit = handleSubmit(async user => {
        setIsMatch(true)
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
        } else {
            if (user.password !== user.confirmPassword) {
                setIsMatch(false)
            }
        }
    })

    return (
        <div className='flex justify-center items-center relative'>
            <div className='fixed top-4 right-4 flex flex-col space-y-2 z-50'>
                {errors.map((error, index) => (
                    <div key={index}
                        className='bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-out'
                        style={{ animationDelay: `${index * 0.25}s` }}
                    >
                        <div className="flex justify-between items-center">
                            <span>{error}</span>
                        </div>
                    </div>
                ))}
                {!isMatch &&
                    <div className='bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-out'
                        style={{ animationDelay: '0.25s' }}>
                        <div className="flex justify-between items-center">
                            <span>Las contraseñas no coinciden</span>
                        </div>
                    </div>
                }
            </div>
            <h1>CREACIÓN DE CUENTA</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor='first_name'>Nombres</label>
                <input type='text' id='first_name' {...register('first_name')} />

                <label htmlFor='last_name'>Apellidos</label>
                <input type='text' id='last_name' {...register('last_name')} />
                
                <label htmlFor='nickname'>Nombre de Usuario</label>
                <input type='text' id='nickname' {...register('nickname')} />

                <label htmlFor='email'>Correo electrónico</label>
                <input type='email' id='email' {...register('email')} />

                <label htmlFor='password'>Contraseña</label>
                <input type='password' id='password' {...register('password')} />

                <label htmlFor='confirmPassword'>Confirmar Contraseña</label>
                <input type='password' id='confirmPassword' {...register('confirmPassword')} />

                <button>Crear cuenta</button>
                <button onClick={openLogin}>Ya tengo una cuenta!</button>
            </form>
        </div>
    )
}

RegisterForm.propTypes = {
    openLogin: PropTypes.func.isRequired
}

export default RegisterForm