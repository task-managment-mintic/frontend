import { useContext, useEffect } from 'react'
import InitialForm from '../components/Hobby/InitialForm'
import { useAuth } from '../context/AuthContext'
import { HobbyContext } from '../context/HobbyContext'
import { Dialog, DialogContent } from '@mui/material'

const Home = () => {
    const { user, isLoading, checkToken, updateIsNew } = useAuth()
    const { hobbyErrors } = useContext(HobbyContext)

    const handleCloseForm = () => {
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
            <Dialog open={user.is_new} maxWidth='sm'>
                <DialogContent>
                    <InitialForm userName={user.first_name} onClose={handleCloseForm} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Home