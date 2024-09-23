import { useContext, useEffect, useRef, useState } from 'react'
import LoginForm from '../components/User/LoginForm'
import RegisterForm from '../components/User/RegisterForm'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogContent, Grid2, IconButton } from '@mui/material'
import { Clear } from '@mui/icons-material'
import DescriptiveCard from '../components/ui/DescriptiveCard'

const Init = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [currentSection, setCurrentSection] = useState('white')
    const [scrollDirection, setScrollDirection] = useState('down')
    const { isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()
    const sectionsRef = useRef([])
    const lastScrollY = useRef(0)

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
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY.current) {
                setScrollDirection('down')
            } else {
                setScrollDirection('up')
            }
            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setCurrentSection(entry.target.dataset.color)
                    }
                })
            },
            {
                threshold: scrollDirection === 'down' ? 0.85 : 0.05
            }
        )

        sectionsRef.current.forEach(section => {
            if (section) observer.observe(section)
        })
        
        return () => {
            sectionsRef.current.forEach(section => {
                if (section) observer.unobserve(section)
            })
        }
    }, [scrollDirection])

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
                bgcolor: currentSection,
                padding: '0.5rem',
                borderRadius: '8px',
                transition: 'background-color 0.5s ease'
            }}>
                <Button variant='contained' onClick={handleShowLogin}>Iniciar Sesión</Button>
                <Button variant='text' onClick={handleShowRegister}>Regístrate!</Button>
            </Box>

            <Grid2 container direction='column'>
                <Grid2 ref={el => (sectionsRef.current[0]) = el} data-color='white'>
                    <DescriptiveCard bgColor='white' sectionIndex={1} />
                </Grid2>

                <Grid2 ref={el => (sectionsRef.current[1]) = el} data-color='black'>
                    <DescriptiveCard bgColor='black' sectionIndex={2} />
                </Grid2>

                <Grid2 ref={el => (sectionsRef.current[2]) = el} data-color='lightcyan'>
                    <DescriptiveCard bgColor='lightcyan' sectionIndex={3} />
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