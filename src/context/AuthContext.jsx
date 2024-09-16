import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {
    createAccountRequest,
    getProfileRequest,
    loginAccountRequest,
    updateIsNewRequest
} from '../services/user-service'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('')
    const [level, setLevel] = useState(0)
    const [xpRequired, setXpRequired] = useState(0)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userErrors, setUserErrors] = useState([])
    const [loginError, setLoginError] = useState('')

    const signUp = async user => {
        setIsLoading(true)
        setUserErrors([])
        try {
            const response = await createAccountRequest(user)
            console.log(response)
            setIsLoading(false)
            return true
        } catch (error) {
            const backErrors = error.response.data.errors.map(err => err.message)
            setIsLoading(false)
            setUserErrors(backErrors)
        }
    }

    const signIn = async user => {
        setIsLoading(true)
        setLoginError('')
        try {
            const response = await loginAccountRequest(user)
            localStorage.setItem('auth_token', response.data.token)
            setIsAuthenticated(true)
            return true
        } catch (error) {
            setIsLoading(false)
            setLoginError(error.response.data.message)
        }
    }

    const checkToken = async () => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            setIsLoading(true)
            try {
                const response = await getProfileRequest()
                if (response.status === 200) {
                    setUser(response.data.user.dataValues)
                    setLevel(response.data.user.level_num)
                    setXpRequired(response.data.user.xp_required)
                    setIsAuthenticated(true)
                    return
                }
            } catch (error) {
                setIsAuthenticated(false)
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        } else {
            setIsAuthenticated(false)
        }
    }

    const updateIsNew = async () => {
        try {
            const response = await updateIsNewRequest()
            console.log(response)
            return true
        } catch (error) {
            console.log(`Método actualizar nuevo usuario: ${error}`)
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            updateIsNew,
            user,
            level,
            xpRequired,
            isAuthenticated,
            isLoading,
            userErrors,
            loginError
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}