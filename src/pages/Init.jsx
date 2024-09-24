import { useContext, useEffect, useState } from 'react'
import LoginForm from '../components/User/LoginForm'
import RegisterForm from '../components/User/RegisterForm'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogContent, Grid2, IconButton, Typography } from '@mui/material'
import { Clear } from '@mui/icons-material'
import DescriptiveCard from '../components/ui/DescriptiveCard'

const Init = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const { isAuthenticated } = useContext(AuthContext)
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
                    <DescriptiveCard bgColor='white' sectionIndex={1} />
                </Grid2>

                <Grid2>
                    <DescriptiveCard bgColor='black' sectionIndex={2} />
                </Grid2>
                
                <Grid2>
                    <DescriptiveCard bgColor='white' sectionIndex={3} imageSrc='va imagen'>
                        <Typography variant='h3'>
                            Descripción del Aplicativo 3
                        </Typography>
                        <Typography variant='body1'>
                            Esta es una descripción breve del aplicativo 3
                        </Typography>
                    </DescriptiveCard>
                </Grid2>

                <Grid2>
                    <DescriptiveCard bgColor='black' sectionIndex={4} imageSrc='va imagen'>
                        <Typography variant='h3'>
                            Descripción del Aplicativo 4
                        </Typography>
                        <Typography variant='body1'>
                            Esta es una descripción breve del aplicativo 4
                        </Typography>
                    </DescriptiveCard>
                </Grid2>

                <Grid2>
                    <DescriptiveCard bgColor='white' sectionIndex={5}>
                        <Typography variant='h3'>
                            Descripción del Aplicativo 5
                        </Typography>
                        <Typography variant='body1'>
                            Esta es una descripción breve del aplicativo 5
                        </Typography>
                    </DescriptiveCard>
                </Grid2>

                <Grid2>
                    <DescriptiveCard bgColor='black' sectionIndex={6} />
                </Grid2>

                <Grid2>
                    <DescriptiveCard bgColor='white' sectionIndex={7} />
                </Grid2>

                <Grid2>
                    <DescriptiveCard bgColor='black' sectionIndex={8} />
                </Grid2>

                <Grid2>
                    <DescriptiveCard bgColor='white' sectionIndex={9} />
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