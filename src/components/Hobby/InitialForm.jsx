import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useHobby } from '../../context/HobbyContext'
import { Box, Button, Grid2, MenuItem, Typography } from '@mui/material'
import { Input, SelectInput } from '../ui'

const InitialForm = ({ userName, onClose }) => {
    const [step, setStep] = useState(1)
    const { createHobby } = useHobby()
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
        <Box sx={{ flexGrow: 1, maxWidth: '600px', margin: '0 auto', padding: '10px' }}>
            {step !== 3 ? (
                <form onSubmit={onSubmit}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <Typography variant='h5' align='center'>
                                Bienvenido a Nombre App, {userName}:
                            </Typography>
                        </Grid2>

                        <Grid2 size={12}>
                            <Typography variant='body1'>
                                Para una experiencia más personalizada en tu sistema de recompensas es necesario que registres al menos dos hobbies que disfrutes hacer, puede ser actividades como dibujar, bailar u objetos como las hamburguesas, los libros, etc.
                            </Typography>
                        </Grid2>
                        
                        <Grid2 size={6}>
                            <Input id='name' label={`Ingresa tu ${step === 1 ? 'primer' : 'segundo'} hobby:`} register={register} />
                        </Grid2>

                        <Grid2 size={6}>
                            <SelectInput id='hobby_type' labelId='hobby_type_label' label='Tipo de Hobby' register={register}>
                                <MenuItem value=''>
                                    <em>:.</em>
                                </MenuItem>
                                <MenuItem value='actividad'>Actividad</MenuItem>
                                <MenuItem value='objeto'>Objeto</MenuItem>
                            </SelectInput>
                        </Grid2>

                        <Grid2 size={12}>
                            <Button type='submit' variant='contained'>
                                {step === 1 ? 'Siguiente' : 'Guardar'}
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            ) :
            (
                <Grid2 container spacing={4}>
                    <Grid2 size={12}>
                        <Typography variant='h4' align='center'>
                            EXCELENTE!        
                        </Typography>        
                    </Grid2>
                    <Grid2 size={12}>
                        <Typography variant='body1' align='center'>
                            Ahora que has registrado tus hobbies, puedes empezar a explorar nuestra aplicación y darle un uso        
                        </Typography>
                    </Grid2>
                    <Grid2 size={12} sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
                        <Button onClick={onClose} variant='contained'>A darle!</Button>
                    </Grid2>
                </Grid2>
            )}
        </Box>
    )
}

InitialForm.propTypes = {
    userName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default InitialForm