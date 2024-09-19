import { useContext, useEffect } from 'react'
import InitialForm from '../components/Hobby/InitialForm'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
    const { user, isLoading, checkToken, updateIsNew } = useContext(AuthContext)

    const handleCloseForm = () => {
        console.log('Si da')
        updateIsNew()
    }

    useEffect(() => {
        checkToken()
    }, [])

    if (isLoading) return <p>Cargando...</p>

    return (
        <div>
            Home de la página
            {user.is_new && <InitialForm userName={user.first_name} onClose={handleCloseForm} /> }
        </div>
    )
}

export default Home