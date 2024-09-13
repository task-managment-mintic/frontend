import { create } from 'zustand'
import {
    createAccountRequest,
    getProfileRequest,
    loginAccountRequest
} from '../services/user-service'

const useAuthStore = create(set => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    level: {},
    isAuthenticated: !!localStorage.getItem('auth_token') || null,
    isLoading: false,
    userErrors: [],
    loginError: '',

    signUp: async user => {
        set({ isLoading: true, userErrors: [] })
        try {
            const response = await createAccountRequest(user)
            console.log(`Línea 14: ${response}`)
            set({ isLoading: false })
            return true
        } catch (error) {
            const backErrors = error.response.data.errors.map(err => err.message)
            set({ isLoading: false, userErrors: backErrors })
        }
    },

    signIn: async user => {
        set({ isLoading: true, loginError: '' })
        try {
            const response = await loginAccountRequest(user)
            localStorage.setItem('auth_token', response.data.token)
            set({ isAuthenticated: true })
            console.log(response)
            return true
        } catch (error) {
            console.log(error.response.data.message)
            set({ isLoading: false, loginError: error.response.data.message })
        }
    },

    checkToken: async () => {
        const token = localStorage.getItem('auth_token')

        if (token) {
            set({ isLoading: true })
            
            try {
                const response = await getProfileRequest()
                if (response.status === 200) {
                    console.log(response)
                    set({ user: response.data.user, isAuthenticated: true })
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    return
                }
            } catch (error) {
                set({ isAuthenticated: false })
                console.log(error)
            } finally {
                set({ isLoading: false })
            }
        } else {
            set({ isAuthenticated: false })
        }
    }
}))

export default useAuthStore