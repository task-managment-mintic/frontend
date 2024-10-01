import { useEffect } from 'react'
import InitialForm from '../components/Hobby/InitialForm'
import { useAuth } from '../context/AuthContext'
import { useHobby } from '../context/HobbyContext'
import { Box, Dialog, DialogContent } from '@mui/material'
import { useErrors } from '../hooks/useErrors'
import ErrorDisplay from '../components/ui/ErrorDisplay'

const Home = () => {
    const { user, isLoading, checkToken, updateIsNew } = useAuth()
    const { hobbyErrors } = useHobby()
    const { errors } = useErrors(hobbyErrors)

    const handleCloseForm = () => {
        updateIsNew()
    }

    useEffect(() => {
        checkToken()
    }, [])

    if (isLoading) return <p>Cargando...</p>

    return (
        <Box component='main' sx={{ flexGrow: 1, p: 3, ml: '200px'}}>
            {hobbyErrors.length > 0 && <ErrorDisplay errors={errors} />}
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