import HobbyList from '../components/Hobby/HobbyList'
import ProfileCard from '../components/User/ProfileCard'
import { useAuth } from '../context/AuthContext'
import { useHobby } from '../context/HobbyContext'
import { Alert, Box, Grid2 } from '@mui/material'

const Profile = () => {
    const { hobbyErrors } = useHobby()
    const { userErrors } = useAuth()

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
            <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
                {userErrors.map((error, index) => (
                    <Alert key={index}
                        severity='error'
                        style={{ animationDelay: `${index * 0.25}s`, marginTop: '2px' }}
                        className='animate-fade-out'
                    >
                        {error}
                    </Alert>
                ))}
            </div>
            <Box sx={{ p: 3 }}>
                <Grid2 container spacing={4}>
                    <Grid2 size={6}>
                        <ProfileCard />
                    </Grid2>
                    <Grid2 size={6}>
                        <HobbyList />
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    )
}

export default Profile