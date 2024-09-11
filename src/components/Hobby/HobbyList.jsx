import { useState } from 'react'

const HobbyList = () => {
    const [isAdding, setIsAdding] = useState(false)

    const handleAddHobby = () => {
        setIsAdding(true)
    }

    const handleSaveHobby = () => {
        setIsAdding(false)
    }

    return (
        <div>
            <h2>Hobbies y Gustos</h2>
            <div>
                <p>Un item por cada hobby</p>
            </div>
            {isAdding && 
                <div>
                    <input type='text' placeholder='Nuevo Hobby' />
                </div>
            }
            <button onClick={isAdding ? handleSaveHobby : handleAddHobby }>Agregar Hobby Nuevo o Botón con ícono</button>
        </div>
    )
}

export default HobbyList