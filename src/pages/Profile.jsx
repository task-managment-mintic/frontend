import HobbyList from '../components/Hobby/HobbyList'
import ProfileCard from '../components/User/ProfileCard'
import { useAuth } from '../context/AuthContext'
import { useHobby } from '../context/HobbyContext'
import { Box, Grid2 } from '@mui/material'
import { useErrors } from '../hooks/useErrors'
import ErrorDisplay from '../components/ui/ErrorDisplay'

const Profile = () => {
    const { hobbyErrors } = useHobby()
    const { userErrors } = useAuth()
    const { errors: hobbyErrorList } = useErrors(hobbyErrors)
    const { errors: userErrorList } = useErrors(userErrors)

    return (
        <Box component='main' sx={{ flexGrow: 1, p: 3, ml: '200px'}}>
            {hobbyErrors.length > 0 && <ErrorDisplay errors={hobbyErrorList} />}
            {userErrors.length > 0 && <ErrorDisplay errors={userErrorList} />}
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