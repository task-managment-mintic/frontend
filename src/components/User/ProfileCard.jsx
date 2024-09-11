const ProfileCard = () => {
    return (
        <div>
            <h1>INFORMACIÓN PERSONAL</h1>
            <div>
                <img alt='profile-img' />
            </div>
            <div>
                <h3>Nombre</h3>
                <p>Nombre + Apellido Usuario</p>
                <h3>Nombre de Usuario</h3>
                <p>Nombre de usuario</p>
                <h3>Correo electrónico</h3>
                <p>Correo del usuario</p>
                <div>
                    <p>Lvl. X</p>
                    Barra de experiencia
                    <p>0/xp_required</p>
                </div>
                <button>Actualizar información</button>
                <button>Actualizar contraseña</button>
            </div>
        </div>
    )
}

export default ProfileCard