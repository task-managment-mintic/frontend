import { useState } from 'react'
import PropTypes from 'prop-types'

const InitialForm = ({ onClose }) => {
    const [hobbyCreated, setHobbyCreated] = useState(false)

    const handleSetHobbies = () => {
        setHobbyCreated(true)
    }

    return (
        <div>
            {!hobbyCreated ? (
                <form>
                    <h3>Bienvenido a Nombre App, Nombre Usuario:</h3>
                    <p>Para una experiencia más personalizada en tu sistema de recompensas es necesario que registres al menos dos hobbies que disfrutes hacer, puede ser actividades como dibujar, bailar u objetos como las hamburguesas, los libros, etc.</p>
                    <label>Ingresa tu primer hobby:</label>
                    <input type='text' />
                    <label>Segundo hobby:</label>
                    <input type='text' />
                    <button onClick={handleSetHobbies}>Guardar</button>
                </form>
            )   : (
                <div>
                    <h3>EXCELENTE!</h3>
                    <p>Ahora que has registrado tus hobbies, puedes empezar a explorar nuestra aplicación y darle un uso</p>    
                    <button onClick={onClose}>A darle!</button>
                </div>
            )}
        </div>
    )
}

InitialForm.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default InitialForm