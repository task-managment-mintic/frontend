const ProfileCard = () => {
    return (
        <div>
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
            <div>
                <h2>Hobbies y Gustos</h2>
                <div>
                    <p>Un item por cada hobby</p>
                </div>
                <button>Agregar Hobby Nuevo o Botón con ícono</button>
            </div>
            <div>
                Recordatorios
            </div>
            <div>
                Tablas o gráficas de análisis / llenar con más información
            </div>
        </div>
    )
}

export default ProfileCard