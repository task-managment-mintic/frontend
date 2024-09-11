import { useState } from 'react'
import InitialForm from '../components/Hobby/InitialForm'

const Home = () => {
    const [isNew, setIsNew] = useState(true)

    const handleClose = () => {
        setIsNew(false)
    }
    return (
        <div>
            Home de la página
            {isNew && <InitialForm onClose={handleClose}/> }
        </div>
    )
}

export default Home