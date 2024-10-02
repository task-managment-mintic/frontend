import { useEffect, useState } from 'react'
import { useHobby } from '../../context/HobbyContext'
import { Button, Grid2, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Input from '../ui/Input'
import SelectInput from '../ui/SelectInput'

const HobbyList = () => {
    const [isAdding, setIsAdding] = useState(false)
    const [newHobby, setNewHobby] = useState({name: '', hobby_type: '' })
    const { hobbiesList, createHobby, fetchHobbiesList } = useHobby()

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
                                    {isAdding && 
                                        <Grid2 container spacing={1}>
                                            <Grid2 size={6}>
                                                <Input id='name' label='Nuevo Hobby' value={newHobby.name} onChange={handleChange} />
                                            </Grid2>
                                            <Grid2 size={6}>
                                                <SelectInput id='hobby_type'
                                                    labelId='hobby_type_label'
                                                    label='Tipo de Hobby'
                                                    value={newHobby.hobby_type}
                                                    onChange={handleChange}
                                                    minWidth='15vw'
                                                >
                                                    <MenuItem value=''>
                                                        <em>:.</em>
                                                    </MenuItem>
                                                    <MenuItem value='actividad'>Actividad</MenuItem>
                                                    <MenuItem value='objeto'>Objeto</MenuItem>
                                                </SelectInput>
                                            </Grid2>
                                        </Grid2>
                                    }
                                    <Button variant='contained'
                                        onClick={isAdding ? handleSaveHobby : handleAddHobby}
                                        sx={{
                                            fontSize: '12px'
                                        }}
                                    >
                                        {isAdding ? 'Guardar Hobby' : 'Agregar Hobby Nuevo'}
                                    </Button>
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