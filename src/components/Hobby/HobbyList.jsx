import { useEffect, useState } from 'react'
import { useHobby } from '../../context/HobbyContext'
import { Button, Grid2, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useForm } from 'react-hook-form'
import HobbyForm from './HobbyForm'

const HobbyList = () => {
    const [isAdding, setIsAdding] = useState(false)
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            hobby_type: ''
        }
    })
    const { hobbiesList, createHobby, fetchHobbiesList } = useHobby()

    const handleAddHobby = () => setIsAdding(true)

    const onSubmit = handleSubmit(async data => {
        const hobbyCreated = await createHobby(data)
        if (hobbyCreated) {
            fetchHobbiesList()
            setIsAdding(false),
            reset()
        }
    })

    useEffect(() => {
        fetchHobbiesList()
    }, [])

    return (
        <Grid2 container spacing={4}>
            <Grid2 size={12}>
                <h2>Hobbies y Gustos</h2>
            </Grid2>
            <Grid2 size={12}>
                <TableContainer>
                    <Table aria-label='hobby table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>Nombre Hobby</TableCell>
                                <TableCell align='left'>Tipo Hobby</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hobbiesList.map((hobby, index) => (
                                <TableRow key={index}>
                                    <TableCell align='left'>{hobby.name}</TableCell>
                                    <TableCell align='left'>{hobby.hobby_type}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={2}>
                                    {isAdding ? 
                                        (
                                            <HobbyForm onSubmit={onSubmit} register={register} />
                                        ) : (
                                            <Button variant='contained'
                                                onClick={handleAddHobby}
                                                sx={{ fontSize: '12px ' }}
                                            >
                                                Agregar Nuevo Hobby
                                            </Button>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>
        </Grid2>
    )
}

export default HobbyList