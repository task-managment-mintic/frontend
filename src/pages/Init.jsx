import { useContext, useEffect, useState } from 'react'
import LoginForm from '../components/User/LoginForm'
import RegisterForm from '../components/User/RegisterForm'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogContent, Grid2, IconButton, Typography } from '@mui/material'
import { ArrowBack, ArrowForward, Clear } from '@mui/icons-material'
import DescriptiveCard from '../components/ui/DescriptiveCard'
import TaskImage from '../assets/sections_img/tasks.png'
import LevelImage from '../assets/sections_img/level.png'
import FinanceImage from '../assets/sections_img/billetes.png'
import { motion } from 'framer-motion'

const Init = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const { isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()

    const content = [
        'Sube de nivel a medida que completas tareas y alcanzas objetivos, haciendo más dinámica la experiencia',
        'Alcanza nuevas recompensas cuando subes de nivel, cada logro cuenta',
        'Los niveles avanzados desbloquean características adicionales dentro de la aplicación'
    ]

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

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % content.length)
    }

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? content.length - 1 : prevIndex - 1
        )
    }

    useEffect(() => {
        if (isAuthenticated) navigate('/home')
    }, [isAuthenticated])
    
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext()
        }, 2500)

        return () => clearInterval(interval)
    }, [currentIndex])

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
                        <Box display='flex' alignItems='center' justifyContent='center'>
                            <IconButton onClick={handlePrevious}>
                                <ArrowBack />
                            </IconButton>
                            <motion.div key={currentIndex}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Typography variant='body1' sx={{ mx: 4, textAlign: 'center'}}>
                                    {content[currentIndex]}
                                </Typography>
                            </motion.div>
                            <IconButton onClick={handleNext}>
                                <ArrowForward />
                            </IconButton>
                        </Box>

                        <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                            {content.map((_, index) => (
                                <Box key={index}
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        backgroundColor: index === currentIndex ? 'blue' : 'gray',
                                        margin: '0 5px',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                />
                            ))}
                        </Box>
                    </DescriptiveCard>
                </Grid2>

                <Grid2>
                    <DescriptiveCard sectionIndex={5} imageSrc={FinanceImage}>
                        <Typography variant='h3'>
                            Dale un aire nuevo a tu vida financiera
                        </Typography>
                        <Typography variant='body1'>
                            Lleva un seguimiento de tu balance mensual entre tus ingresos y gastos
                        </Typography>
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