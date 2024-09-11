import { useState } from 'react'
import LoginForm from '../components/User/LoginForm'
import RegisterForm from '../components/User/RegisterForm'

const Init = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [isRegister, setIsRegister] = useState(false)

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
