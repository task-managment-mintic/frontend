import PropTypes from 'prop-types'
import { FormControl, InputLabel, Select } from '@mui/material'

const SelectInput = ({ id, labelId, label, register, minWidth='20vw', children }) => {
    return (
        <FormControl>
            <InputLabel id={labelId}>
                {label}
            </InputLabel>

            <Select id={id}
                labelId={labelId}
                label={label}
                defaultValue=''
                {...register(id)}
                sx={{ minWidth: `${minWidth} ` }}
                size='small'
            >
                {children}
            </Select>
        </FormControl>
    )
}

SelectInput.propTypes = {
    id: PropTypes.string.isRequired,
    labelId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    minWidth: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default SelectInput