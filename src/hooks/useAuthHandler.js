import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'


export const useAuthHandler = () => {
    const { signIn, signUp, updateAccount, updatePassword } = useAuth()
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

    const updateUserProfile = async (user, closeModal) => {
        try {
            const userUpdated = await updateAccount(user)
            if (userUpdated) {
                Swal.fire({
                    title: 'ÉXITO',
                    text: 'Datos actualizados correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    if (closeModal) closeModal()
                })
            }
        } catch (error) {
            setErrors([error.message])
        }
    }

    const updateUserPassword = async (user, navigate) => {
        try {
            const pwdUpdated = await updatePassword(user)
            if (pwdUpdated) { 
                Swal.fire({
                    title: 'Contraseña actualizada!',
                    text: 'Se cerrará sesión y deberás iniciar de nuevo con tu nueva contraseña',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    localStorage.removeItem('auth_token')
                    navigate('/')
                })
            }
        } catch (error) {
            setErrors([error.message])
        }
    }

    return { loginUser, registerUser, updateUserProfile, updateUserPassword, errors }
}