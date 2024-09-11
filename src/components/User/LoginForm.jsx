import PropTypes from 'prop-types'

const LoginForm = ({ openRegister }) => {
    return (
        <div>
            <h1>INICIAR SESIÓN</h1>
            <form>
                <label htmlFor=''>Nombre de Usuario o Correo</label>
                <input type='text' />
                <label htmlFor=''>Contraseña</label>
                <input type='password' />
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