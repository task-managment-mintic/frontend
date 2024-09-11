const UpdateForm = () => {
    return (
        <div>
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

            <form>
                <label htmlFor=''>Contraseña anterior</label>
                <input type='password' />
                <label htmlFor=''>Nueva contraseña</label>
                <input type='password' />
                <label htmlFor=''>Confirmar nueva contraseña</label>
                <input type='password' />
            </form>
        </div>
    )
}

export default UpdateForm