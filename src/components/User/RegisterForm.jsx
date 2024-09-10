import PropTypes from 'prop-types'

const RegisterForm = ({ openLogin }) => {
    return (
        <div>
            <h1>CREACIÓN DE CUENTA</h1>
            <form>
                <label htmlFor=''>Nombres</label>
                <input type='text' />
                <label htmlFor=''>Apellidos</label>
                <input type='text'/>
                <label htmlFor=''>Nombre de Usuario</label>
                <input type='text' />
                <label htmlFor=''>Correo electrónico</label>
                <input type='email' />
                <label htmlFor=''>Contraseña</label>
                <input type='password' />
                <label htmlFor=''>Confirmar Contraseña</label>
                <input type='password' />
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