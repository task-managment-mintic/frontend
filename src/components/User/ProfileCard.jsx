import { useContext, useState } from 'react'
import UpdateForm from './UpdateForm'
import AvatarTable from './AvatarTable'
import { AuthContext } from '../../context/AuthContext'

const ProfileCard = () => {
    const [formType, setFormType] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showEditButton, setShowEditButton] = useState(false)
    const [isAvatarTableOpen, setIsAvatarTableOpen] = useState(false)
    const { user, level, xpRequired, updateProfileImg } = useContext(AuthContext)

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

    const handleUpdateAvatar = async url => {
        await updateProfileImg(url)
        setIsAvatarTableOpen(false)
    }

    return (
        <div>
            <h1>INFORMACIÓN PERSONAL</h1>
            <div onMouseEnter={() => setShowEditButton(true)}
                onMouseLeave={() => setShowEditButton(false)}
            >
                <img alt='profile-img' src={`https://res.cloudinary.com/dgm8dtsce/image/upload/${user.profile_img}`} />
                {showEditButton && (
                    <button onClick={handleOpenAvatarTable}
                        style={{
                            position: 'absolute',
                            top: '60px',
                            right: '60px',
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

            {isAvatarTableOpen && <AvatarTable onClose={closeAvatarTable} updateAvatar={handleUpdateAvatar} />}

            <div>
                <h3>Nombre</h3>
                <p>{user.first_name} {user.last_name}</p>
                <h3>Nombre de Usuario</h3>
                <p>{user.nickname}</p>
                <h3>Correo electrónico</h3>
                <p>{user.email}</p>
                <div>
                    <p>Lvl. {level}</p>
                    Barra de experiencia
                    <p>{user.xp}/{xpRequired}XP</p>
                </div>
                <button onClick={() => handleFormChange('profile')}>Actualizar información</button>
                <button onClick={() => handleFormChange('password')}>Actualizar contraseña</button>

                {isModalOpen && <UpdateForm formType={formType} closeModal={closeModal} />}
            </div>
        </div>
    )
}

export default ProfileCard