import { Grid2 } from '@mui/material'
import PropTypes from 'prop-types'

const DescriptiveCard = ({ bgColor, sectionIndex, imageSrc = '', children }) => {
    const isImageLeft = sectionIndex % 2 === 0

    return (
        <div style={{
                minHeight: '50vh',
                backgroundColor: bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem'
            }}
        >
            <Grid2 container spacing={1}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: isImageLeft ? 'row-reverse' : 'row'
                }}
            >
                {imageSrc !== '' && (
                    <Grid2 size={4}>
                        <div style={{ width: '100px', height: '100px', backgroundColor: 'blue' }}></div>
                    </Grid2>
                )}
                <Grid2 size={imageSrc === '' ? 12 : 8}>
                    {children}
                </Grid2>
            </Grid2>
        </div>
    )
}

DescriptiveCard.propTypes = {
    bgColor: PropTypes.string.isRequired,
    sectionIndex: PropTypes.number.isRequired,
    imageSrc: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default DescriptiveCard