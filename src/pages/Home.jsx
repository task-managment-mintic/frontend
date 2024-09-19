import { useContext, useEffect } from 'react'
import InitialForm from '../components/Hobby/InitialForm'
import { AuthContext } from '../context/AuthContext'
import { HobbyContext } from '../context/HobbyContext'

const Home = () => {
    const { user, isLoading, checkToken, updateIsNew } = useContext(AuthContext)
    const { hobbyErrors } = useContext(HobbyContext)

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
            <div className='fixed top-4 right-4 flex flex-col space-y-2 z-50'>
                {hobbyErrors.map((error, index) => (
                    <div key={index}
                        className='bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-out'
                        style={{ animationDelay: `${index * 0.25}s` }}
                    >
                        <div className="flex justify-between items-center">
                            <span>{error}</span>
                        </div>
                    </div>
                ))}
            </div>
            Home de la página
            {user.is_new && <InitialForm userName={user.first_name} onClose={handleCloseForm} /> }
        </div>
    )
}

export default Home