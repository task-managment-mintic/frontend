import { useContext, useEffect, useState } from 'react'
import LoginForm from '../components/User/LoginForm'
import RegisterForm from '../components/User/RegisterForm'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

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
            {!isLogin && !isRegister && (
                <div>
                    Página inicial
                    <button onClick={handleShowLogin}>Iniciar Sesión</button>
                    <button onClick={handleShowRegister}>Regístrate!</button>
                </div>
            )}
            {(isLogin || isRegister) && (
                <button onClick={handleGoBack}>Volver</button>
            )}
            {isLogin && <LoginForm openRegister={handleShowRegister}/>}
            {isRegister && <RegisterForm openLogin={handleShowLogin}/>}
        </div>
    )
}

export default Init
