import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createHobbyRequest, getHobbiesRequest, getHobbyRequest } from '../services/hobby-service'

export const HobbyContext = createContext()

export const HobbyProvider = ({ children }) => {
    const [hobby, setHobby] = useState(null)
    const [hobbiesList, setHobbiesList] = useState([])
    const [hobbyErrors, setHobbyErrors] = useState([])
    const { isAuthenticated } = useContext(AuthContext)

    const createHobby = async hobby => {
        if (!isAuthenticated) return

        setHobbyErrors([])
        try {
            const response = await createHobbyRequest(hobby)
            console.log(response)
            return true
        } catch (error) {
            // console.log(error.response.data.errors.map(err => err))
            console.log(error)
            setHobbyErrors([error.message || 'Error al crear el hobby'])
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