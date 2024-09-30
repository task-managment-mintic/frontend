import { useState } from 'react'
import PropTypes from 'prop-types'
import { avatarUrls }from '../../constants/avatarUrls'
import { Button, Grid2 } from '@mui/material'

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
        <Grid2 spacing={2} container>
            <Grid2 spacing={2} container size={12}>
                {avatarUrls.map((avatar, index) => (
                    <Grid2 key={index} size={3}
                        onClick={() => handleAvatarSelect(avatar.url)}
                        sx={{
                            width: '150px',
                            height: '150px',
                            cursor: 'pointer'
                        }}
                    >
                        <img alt={avatar.title}
                            src={`https://res.cloudinary.com/dgm8dtsce/image/upload/${avatar.url}`} 
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </Grid2>
                ))}
            </Grid2>
            <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' onClick={handleAvatarChange} disabled={!selectedAvatar}>
                    Cambiar Avatar
                </Button>
            </Grid2>
        </Grid2>
    )
}

AvatarTable.propTypes = {
    onClose: PropTypes.func.isRequired,
    updateAvatar: PropTypes.func.isRequired
}

export default AvatarTable