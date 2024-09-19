import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

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
        <div className='flex justify-center items-center relative'>
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

                <label htmlFor='confirm_password'>Confirmar Contraseña</label>
                <input type='password' id='confirm_password' {...register('confirm_password')} />

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