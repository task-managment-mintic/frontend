import { Alert } from '@mui/material'
import PropTypes from 'prop-types'

const ErrorDisplay = ({ errors = [] }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}
        >
            {errors.map((error, index) => (
                <Alert key={index}
                    severity='error'
                    style={{ animationDelay: `${index * 0.25}s`, marginTop: '2px' }}
                    className='animate-fade-out'
                >
                    {error}
                </Alert>
            ))}
        </div>
    )
}

ErrorDisplay.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ErrorDisplay