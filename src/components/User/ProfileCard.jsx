import { useState } from 'react'
import UpdateForm from './UpdateForm'
import AvatarTable from './AvatarTable'

const ProfileCard = () => {
    const [formType, setFormType] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showEditButton, setShowEditButton] = useState(false)
    const [isAvatarTableOpen, setIsAvatarTableOpen] = useState(false)

    const handleFormChange = type => {
        setFormType(type)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleOpenAvatarTable = () => {
        setIsAvatarTableOpen(true)
    }
    const closeAvatarTable = () => {
        setIsAvatarTableOpen(false)
    }

    return (
        <div>
            <h1>INFORMACIÓN PERSONAL</h1>
            <div onMouseEnter={() => setShowEditButton(true)}
                onMouseLeave={() => setShowEditButton(false)}
            >
                <img alt='profile-img' src='https://res.cloudinary.com/dgm8dtsce/image/upload/v1725937229/avatars/default-img-avatar-tskmng-18.jpg' />
                {showEditButton && (
                    <button onClick={handleOpenAvatarTable}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            border: 'none',
                            padding: '5px',
                            cursor: 'pointer',
                            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)'
                        }}
                    >✏️</button>
                )}
            </div>

            {isAvatarTableOpen && <AvatarTable onClose={closeAvatarTable} />}

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
                <button onClick={() => handleFormChange('profile')}>Actualizar información</button>
                <button onClick={() => handleFormChange('password')}>Actualizar contraseña</button>

                {isModalOpen && <UpdateForm formType={formType} closeModal={closeModal} />}
            </div>
        </div>
    )
}

export default ProfileCard