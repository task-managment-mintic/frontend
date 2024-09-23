import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

const DescriptiveCard = ({ bgColor, sectionIndex }) => {
    return (
        <div style={{
                minHeight: '100vh',
                backgroundColor: bgColor,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem'
            }}
        >
            <Typography variant='h3'>
                Descripción del Aplicativo {sectionIndex}
            </Typography>
            <Typography variant='body1'>
                Esta es una descripción breve del aplicativo {sectionIndex}
            </Typography>
        </div>
    )
}

DescriptiveCard.propTypes = {
    bgColor: PropTypes.string.isRequired,
    sectionIndex: PropTypes.number.isRequired
}

export default DescriptiveCard