import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Box, Button, Dialog, DialogContent, Grid2, IconButton, LinearProgress, Typography } from '@mui/material'
import { Clear, Edit } from '@mui/icons-material'
import AvatarTable from './AvatarTable'
import UpdateForm from './UpdateForm'

const ProfileCard = () => {
    const [formType, setFormType] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showEditButton, setShowEditButton] = useState(false)
    const [isAvatarTableOpen, setIsAvatarTableOpen] = useState(false)
    const { user, level, xpRequired, updateProfileImg } = useAuth()

    const xpPercentage = (user.xp / xpRequired) * 100

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
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Typography variant='h5'>INFORMACIÓN PERSONAL</Typography>
                </Grid2>

                <Grid2 size={6}>
                    <Box onMouseEnter={() => setShowEditButton(true)}
                        onMouseLeave={() => setShowEditButton(false)}
                        sx={{
                            position: 'relative',
                            width: '150px',
                            height: '150px',
                            mx: 'auto'
                        }}
                    >
                        <img alt='profile-img'
                            src={`https://res.cloudinary.com/dgm8dtsce/image/upload/${user.profile_img}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                        />
                        {showEditButton && (
                            <IconButton sx={{
                                color: 'black',
                                position: 'absolute',
                                top: '5px',
                                right: '5px'
                            }}
                                onClick={handleOpenAvatarTable}
                            >
                                <Edit />
                            </IconButton>
                        )}
                    </Box>
                </Grid2>

                <Grid2 size={6} container spacing={1}>
                    <Grid2 size={6}>
                        <Typography variant='body1'>NOMBRE</Typography>
                        <Typography variant='body2'>{user.first_name} {user.last_name}</Typography>
                    </Grid2>

                    <Grid2 size={6}>
                        <Typography variant='body1'>NOMBRE DE USUARIO</Typography>
                        <Typography variant='body2'>{user.nickname}</Typography>
                    </Grid2>

                    <Grid2 size={12}>
                        <Typography variant='body1'>CORREO ELECTRÓNICO</Typography>
                        <Typography variant='body2'>{user.email}</Typography>
                    </Grid2>
                </Grid2>

                <Grid2 size={12} container spacing={1}>
                    <Grid2 size={12}>
                        <Typography variant='body2'>Nivel: {level}</Typography>
                    </Grid2>
                    <Grid2 size={10}>
                        <LinearProgress variant='determinate' value={xpPercentage}
                            sx={{
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: 'lightcyan',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: 'cyan'
                                }
                            }}
                        />
                    </Grid2>
                    <Grid2 size={2}>
                        <Typography variant='body2'>{user.xp}/{xpRequired}XP</Typography>
                    </Grid2>
                </Grid2>

                <Grid2 size={12} container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained'
                        onClick={() => handleFormChange('profile')}
                        sx={{
                            fontSize: '12px',
                            mb: '5px',
                            px: '12px'
                        }}
                    >
                        Actualizar información
                    </Button>
                    <Button variant='contained'
                        onClick={() => handleFormChange('password')}
                        sx={{
                            fontSize: '12px',
                            mb: '5px',
                            px: '14px'
                        }}
                    >
                        Actualizar contraseña
                    </Button>
                </Grid2>
            </Grid2>

            <Dialog open={isAvatarTableOpen} maxWidth='md'>
                <DialogContent>
                    <IconButton sx={{
                        bgcolor: 'red',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'lightpink',
                            color: 'black'
                        }
                    }}
                        onClick={closeAvatarTable}
                    >
                        <Clear />
                    </IconButton>
                    <AvatarTable onClose={closeAvatarTable} updateAvatar={handleUpdateAvatar} />
                </DialogContent>
            </Dialog>

            <Dialog open={isModalOpen} onClose={closeModal}>
                <DialogContent>
                    <UpdateForm formType={formType} closeModal={closeModal} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProfileCard