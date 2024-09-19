import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const NavBar = () => {
    const { signOut } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut()
        navigate('/')
    }

    return (
        <div>
            <ul>
                <li>
                    <Link to='/home'>Inicio</Link>
                </li>
                <li>
                    <Link to='/profile'>Mi Perfil</Link>
                </li>
            </ul>
            <button onClick={handleSignOut}>Cerrar sesión</button>
        </div>
    )
}

export default NavBar