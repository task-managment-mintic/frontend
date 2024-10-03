import { useEffect, useState } from 'react'
import LoginForm from '../components/User/LoginForm'
import RegisterForm from '../components/User/RegisterForm'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogContent, Grid2, IconButton, Typography } from '@mui/material'
import { Clear } from '@mui/icons-material'
import TaskImage from '../assets/sections_img/tasks.png'
import LevelImage from '../assets/sections_img/level.png'
import FinanceImage from '../assets/sections_img/billetes.png'
import TextCarrousel from '../components/ui/TextCarrousel'
import { levelContent, financesContent } from '../constants/descriptiveTexts'
import { DescriptiveCard } from '../components/ui'

const Init = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleShowLogin = () => {
        setIsLogin(true)
        setIsRegister(false)
    }
    const handleShowRegister = () => { 
        setIsRegister(true)
        setIsLogin(false)
    }
    const handleGoBack = () => {
        setIsLogin(false)
        setIsRegister(false)
    }

    useEffect(() => {
        if (isAuthenticated) navigate('/home')
    }, [isAuthenticated])
    
    return (
        <div>
            <Box sx={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                zIndex: 1000,
                bgcolor: 'transparent',
                padding: '0.5rem',
                borderRadius: '8px',
                transition: 'background-color 0.5s ease'
            }}>
                <Button variant='contained' onClick={handleShowLogin}>Iniciar Sesión</Button>
                <Button variant='text' onClick={handleShowRegister}>Regístrate!</Button>
            </Box>

            <Grid2 container direction='column'>
                <Grid2>
                    <DescriptiveCard sectionIndex={1}>
                        <Typography variant='h1'>Presentamos MasterTask APP</Typography>
                    </DescriptiveCard>
                </Grid2>

                <Grid2>
                    <DescriptiveCard sectionIndex={2}>
                        <Typography variant='h3'>Gestiona tu tiempo para optimizar tu día a día</Typography>
                        <Typography variant='h5'>Explora las múltiples herramientas para gestionar tus tareas, finanzas y más, así como las mecánicas para incentivar el uso de estas</Typography>
                    </DescriptiveCard>
                </Grid2>
                
                <Grid2>
                    <DescriptiveCard sectionIndex={3} imageSrc={TaskImage}>
                        <Typography variant='h3'>
                            Organiza y completa tus Tareas diarias.
                        </Typography>
                        <Typography variant='body1'>
                            Planifica, asigna prioridades y haz seguimiento de tus tareas diarias.
                        </Typography>
                    </DescriptiveCard>
                </Grid2>

                <Grid2>
                    <DescriptiveCard sectionIndex={4} imageSrc={LevelImage}>
                        <Typography variant='h3'>
                            Mejora a través de Niveles
                        </Typography>
                        <TextCarrousel content={levelContent} />
                    </DescriptiveCard>
                </Grid2>

                <Grid2>
                    <DescriptiveCard sectionIndex={5} imageSrc={FinanceImage}>
                        <Typography variant='h3'>
                            Dale un aire nuevo a tu vida financiera
                        </Typography>
                        <TextCarrousel content={financesContent} />
                    </DescriptiveCard>
                </Grid2>

                <Grid2>
                    <DescriptiveCard sectionIndex={6}>
                        <Typography variant='h2'>No esperes a quedarte sin tiempo para darle manejo a tu tiempo</Typography>
                        <Button variant='contained' onClick={handleShowRegister}>Empieza Ahora</Button>
                    </DescriptiveCard>
                </Grid2>
            </Grid2>

            <Dialog open={isLogin || isRegister} onClose={handleGoBack} maxWidth='sm'>
                <DialogContent>
                    <IconButton sx={{
                        bgcolor: 'red',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'lightpink',
                            color: 'black'
                        }
                    }}
                        onClick={handleGoBack}
                    >
                        <Clear />
                    </IconButton>
                    {isLogin && <LoginForm openRegister={handleShowRegister}/>}
                    {isRegister && <RegisterForm openLogin={handleShowLogin}/>}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Init