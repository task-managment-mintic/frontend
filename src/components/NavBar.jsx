import { Link } from "react-router-dom"

const NavBar = () => {
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
        </div>
    )
}

export default NavBar