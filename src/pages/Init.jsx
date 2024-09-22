import { useContext, useEffect, useState } from 'react'
import LoginForm from '../components/User/LoginForm'
import RegisterForm from '../components/User/RegisterForm'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogContent, Grid2, IconButton } from '@mui/material'
import { Clear } from '@mui/icons-material'

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
        <div style={{ textAlign: 'center', padding:'2rem' }}>
            <Grid2 container spacing={2} justifyContent='center'>
                <Grid2 item>
                    <Button variant='contained' onClick={handleShowLogin}>Iniciar Sesión</Button>
                    <Button variant='text' onClick={handleShowRegister}>Regístrate!</Button>
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