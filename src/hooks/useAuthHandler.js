import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'


export const useAuthHandler = () => {
    const { signIn, signUp } = useAuth()
    const [errors, setErrors] = useState([])

    const loginUser = async (user, navigate) => {
        try {
            const signInResponse = await signIn(user)
            if (signInResponse) {
                navigate('/')
            }
        } catch (error) {
            setErrors([error.message])
        }
    }

    const registerUser = async (user, onSuccess) => {
        try {
            const signUpResponse = await signUp(user)
            if (signUpResponse) {
            Swal.fire({
                title: 'ÉXITO',
                text: 'Tu cuenta ha sido creada con éxito, ahora debes iniciar sesión',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
                .then(onSuccess)
            }
        } catch (error) {
            setErrors([error.message])
        }
    }

    return { loginUser, registerUser, errors }
}