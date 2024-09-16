import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { HobbyContext } from '../../context/HobbyContext'

const InitialForm = ({ userName, onClose }) => {
    const [step, setStep] = useState(1)
    const { createHobby } = useContext(HobbyContext)
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = handleSubmit(async hobby => {
        console.log(hobby)
        if (step === 1) {
            const firstHobby = await createHobby(hobby)
            if (firstHobby) {
                setStep(2)
                reset()
            }
        } else if (step === 2) {
            const secondHobby = await createHobby(hobby)
            if (secondHobby) {
                setStep(3)
            }
        }
    })

    return (
        <div>
            {step !== 3 ? (
                <form onSubmit={onSubmit}>
                    <h3>Bienvenido a Nombre App, {userName}:</h3>
                    <p>Para una experiencia más personalizada en tu sistema de recompensas es necesario que registres al menos dos hobbies que disfrutes hacer, puede ser actividades como dibujar, bailar u objetos como las hamburguesas, los libros, etc.</p>
                    <label htmlFor='name'>Ingresa tu {step === 1 ? 'primer' : 'segundo'} hobby:</label>
                    <input type='text' id='name' {...register('name')} />

                    <label>Tipo de hobby:</label>
                    <select id='hobby_type' {...register('hobby_type')}>
                        <option value=''>:.</option>
                        <option value='actividad'>Actividad</option>
                        <option value='objeto'>Objeto</option>
                    </select>
                    
                    <button type='submit'>
                        {step === 1 ? 'Siguiente' : 'Guardar'}
                    </button>
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
    userName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default InitialForm