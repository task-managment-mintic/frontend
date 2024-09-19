import { useState } from 'react'
import PropTypes from 'prop-types'
import { avatarUrls }from '../../constants/avatarUrls'

const AvatarTable = ({ onClose, updateAvatar }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(null)

    const handleAvatarSelect = url => {
        setSelectedAvatar(url)
    }

    const handleAvatarChange = () => {
        if (selectedAvatar) {
            updateAvatar(selectedAvatar)
            onClose()
        }
    }

    return (
        <div>
            <div>
                {avatarUrls.map((avatar, index) => (
                    <div key={index} onClick={() => handleAvatarSelect(avatar.url)}>
                        <img src={`https://res.cloudinary.com/dgm8dtsce/image/upload/${avatar.url}`} alt={avatar.title} />
                    </div>
                ))}
            </div>
            <button onClick={handleAvatarChange} disabled={!selectedAvatar}>
                Cambiar Avatar
            </button>
            <button onClick={onClose}>Cerrar</button>
        </div>
    )
}

AvatarTable.propTypes = {
    onClose: PropTypes.func.isRequired,
    updateAvatar: PropTypes.func.isRequired
}

export default AvatarTable