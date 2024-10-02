import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext'
import { createHobbyRequest, getHobbiesRequest, getHobbyRequest } from '../services/hobby-service'

const HobbyContext = createContext()

export const HobbyProvider = ({ children }) => {
    const [hobby, setHobby] = useState(null)
    const [hobbiesList, setHobbiesList] = useState([])
    const [hobbyErrors, setHobbyErrors] = useState([])
    const { isAuthenticated } = useAuth()

    const createHobby = async hobby => {
        if (!isAuthenticated) return

        setHobbyErrors([])
        try {
            const response = await createHobbyRequest(hobby)
            console.log(response)
            return true
        } catch (error) {
            console.log(error.response.data.errors.map(err => err.message))
            setHobbyErrors(error.response.data.errors.map(err => err.message))
        }
    }

    const fetchHobbiesList = async () => {
        setHobbyErrors([])
        try {
            const response = await getHobbiesRequest()
            setHobbiesList(response.data.hobbies)
            return true
        } catch (error) {
            console.log(error)
        }
    }

    const fetchHobby = async () => {
        setHobbyErrors([])
        try {
            const response = await getHobbyRequest()
            setHobby(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <HobbyContext.Provider value={{
            createHobby,
            fetchHobbiesList,
            fetchHobby,
            hobby,
            hobbiesList,
            hobbyErrors
        }}>
            {children}
        </HobbyContext.Provider>
    )
}

HobbyProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export const useHobby = () => useContext(HobbyContext)