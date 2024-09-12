import PropTypes from 'prop-types'
import useUserStore from '../../stores/useUserStore'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const LoginForm = ({ openRegister }) => {
    const { loginError, signIn } = useUserStore()
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
            {loginError && (
                <div className='fixed top-4 right-4 flex flex-col space-y-2 z-50'>
                    <div className='bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-out'
                        style={{ animationDelay: `0.25s` }}
                    >
                        <div className="flex justify-between items-center">
                            <span>{loginError}</span>
                        </div>
                    </div>
                </div>
            )}
            <h1>INICIAR SESIÓN</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor='logger'>Nombre de Usuario o Correo</label>
                <input type='text' id='logger' {...register('logger')} />

                <label htmlFor='password'>Contraseña</label>
                <input type='password' id='password' {...register('password')} />

                <button>INGRESAR</button>
                <button onClick={openRegister}>No tienes una cuenta? Crea una!</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    openRegister: PropTypes.func.isRequired
}

export default LoginForm