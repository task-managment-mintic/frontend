import { create } from 'zustand'
import { createAccountRequest, loginAccountRequest } from '../services/user-service'

const useUserStore = create(set => ({
    user: null,
    isAuthenticated: false,
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
            set({ isAuthenticated: true })
            console.log(response)
            return true
        } catch (error) {
            console.log(error.response.data.message)
            set({ isLoading: false, loginError: error.response.data.message })
        }
    }
}))

export default useUserStore