import { useEffect } from 'react'
import InitialForm from '../components/Hobby/InitialForm'
import { useAuth } from '../context/AuthContext'
import { useHobby } from '../context/HobbyContext'
import { Box, Dialog, DialogContent } from '@mui/material'

const Home = () => {
    const { user, isLoading, checkToken, updateIsNew } = useAuth()
    const { hobbyErrors } = useHobby()

    const handleCloseForm = () => {
        updateIsNew()
    }

    useEffect(() => {
        checkToken()
    }, [])

    if (isLoading) return <p>Cargando...</p>

    return (
        <Box component='main' sx={{ flexGrow: 1, p: 3, ml: '200px'}}>
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
        </Box>
    )
}

export default Home