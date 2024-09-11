import PropTypes from 'prop-types'

const UpdateForm = ({ formType, closeModal }) => {
    return (
        <div>
            <button onClick={closeModal}>Cerrar</button>
            {formType === 'profile' && (
                <form>
                    <label>Nombres</label>
                    <input type='text' />
                    <label>Apellidos</label>
                    <input type='text' />
                    <label htmlFor=''>Nombre de Usuario</label>
                    <input type='text' />
                    <label htmlFor=''>Correo Electrónico</label>
                    <input type='email' />
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