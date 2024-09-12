import { create } from 'zustand'
import { createAccountRequest } from '../services/user-service'

const useUserStore = create(set => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    userErrors: [],

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
    }
}))

export default useUserStore