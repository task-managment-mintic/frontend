import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createHobbyRequest } from '../services/hobby-service'

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

    return (
        <HobbyContext.Provider value={{
            createHobby,
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