import { useContext } from 'react'
import HobbyList from '../components/Hobby/HobbyList'
import ProfileCard from '../components/User/ProfileCard'
import { HobbyContext } from '../context/HobbyContext'

const Profile = () => {
    const { hobbyErrors } = useContext(HobbyContext)

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
            <ProfileCard />
            <HobbyList />
        </div>
    )
}

export default Profile