import { useContext, useEffect, useState } from 'react'
import { HobbyContext } from '../../context/HobbyContext'

const HobbyList = () => {
    const [isAdding, setIsAdding] = useState(false)
    const [newHobby, setNewHobby] = useState({name: '', hobby_type: '' })
    const { hobbiesList, createHobby, fetchHobbiesList } = useContext(HobbyContext)

    const handleAddHobby = () => {
        setIsAdding(true)
    }

    const handleSaveHobby = async () => {
        console.log('Se hace click: ', newHobby)
        const hobbyCreated = await createHobby(newHobby)
        if (hobbyCreated) {
            fetchHobbiesList()
            setIsAdding(false)
            setNewHobby({ name: '', hobby_type: '' })
        }
    }

    const handleChange = e => {
        const { name, value } = e.target
        setNewHobby(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        fetchHobbiesList()
    }, [])

    return (
        <div>
            <h2>Hobbies y Gustos</h2>
            {hobbiesList.map((hobby, index) => (
                <div key={index} className='flex gap-3'>
                    <p>{hobby.name}</p>
                    <p>{hobby.hobby_type}</p>
                </div>
            ))}
            {isAdding && 
                <div>
                    <input type='text'
                        name='name'
                        value={newHobby.name}
                        onChange={handleChange}
                        placeholder='Nuevo Hobby'
                    />
                    <select name='hobby_type' value={newHobby.hobby_type} onChange={handleChange}>
                        <option value=''>:.</option>
                        <option value='actividad'>Actividad</option>
                        <option value='objeto'>Objeto</option>
                    </select>
                </div>
            }
            <button onClick={isAdding ? handleSaveHobby : handleAddHobby}>
                {isAdding ? 'Guardar Hobby' : 'Agregar Hobby Nuevo'}
            </button>
        </div>
    )
}

export default HobbyList