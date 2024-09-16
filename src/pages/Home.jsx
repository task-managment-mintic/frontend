import { useContext } from 'react'
import InitialForm from '../components/Hobby/InitialForm'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
    const { user, updateIsNew } = useContext(AuthContext)

    const handleCloseForm = () => {
        updateIsNew()
    }

    return (
        <div>
            Home de la página
            {user.is_new && <InitialForm userName={user.first_name} onClose={handleCloseForm} /> }
        </div>
    )
}

export default Home