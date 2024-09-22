import { useState } from 'react'
import PropTypes from 'prop-types'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'

const PwdInput = ({ id, label, register}) => {
    const [showPassword, setShowPassword] = useState(false)
 
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <TextField id={id}
                label={label}
                type={showPassword ? 'text' : 'password'}
                variant='outlined'
                {...register(id)}
                size='small'
                fullWidth
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={togglePasswordVisibility}
                                    edge='end'
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            / >
        </div>
    )
}

PwdInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired
}

export default PwdInput