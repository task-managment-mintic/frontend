import { Button, Grid2, MenuItem } from '@mui/material'
import Input from '../ui/Input'
import SelectInput from '../ui/SelectInput'
import PropTypes from 'prop-types'

const HobbyForm = ({ onSubmit, register }) => {
    return (
        <form onSubmit={onSubmit}>
            <Grid2 container spacing={1}>
                <Grid2 size={6}>
                    <Input id='name' label='Nuevo Hobby' register={register} />
                </Grid2>
                <Grid2 size={6}>
                    <SelectInput id='hobby_type' labelId='hobby_type_label' label='Tipo de Hobby' register={register} minWidth='15vw'>
                        <MenuItem value=''><em>:.</em></MenuItem>
                        <MenuItem value='actividad'>Actividad</MenuItem>
                        <MenuItem value='objeto'>Objeto</MenuItem>
                    </SelectInput>
                </Grid2>
            </Grid2>
            <Button variant='contained' type='submit' sx={{ fontSize: '12px' }}>Guardar Hobby</Button>
        </form>
    )
}

HobbyForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

export default HobbyForm