import { TextField } from '@mui/material'
import PropTypes from 'prop-types'

const Input = ({ id, label, register, variant='outlined', type='text', value, onChange }) => {
    return (
        <div>
            <TextField id={id}
                label={label}
                variant={variant}
                {...(register ? register(id) : { name: id, value, onChange })}
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
    register: PropTypes.func,
    variant: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default Input
