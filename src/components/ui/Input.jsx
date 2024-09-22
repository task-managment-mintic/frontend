import { TextField } from '@mui/material'
import PropTypes from 'prop-types'

const Input = ({ id, label, register, variant='outlined', type='text' }) => {
    return (
        <div>
            <TextField id={id}
                label={label}
                variant={variant}
                {...register(id)}
                size='small'
                fullWidth
                type={type}
            />
        </div>
    )
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    variant: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default Input
