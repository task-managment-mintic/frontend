import { Grid2 } from '@mui/material'
import PropTypes from 'prop-types'

const DescriptiveCard = ({ sectionIndex, imageSrc = '', children }) => {
    const isImageLeft = sectionIndex % 2 === 0

    return (
        <div style={{
                minHeight: '70vh',
                backgroundColor: isImageLeft ? 'lightcoral' : 'white' ,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem'
            }}
        >
            <Grid2 container spacing={4}
                sx={{
                    width: '80%',
                    display: 'flex',
                    flexDirection: isImageLeft ? 'row-reverse' : 'row'
                }}
            >
                {imageSrc !== '' && (
                    <Grid2 size={4}>
                        <img src={imageSrc}
                            alt={`section-${sectionIndex}`}
                            style={{
                                width: '300px',
                                height: '300px',
                                objectFit: 'cover'
                            }}
                        />
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
    sectionIndex: PropTypes.number.isRequired,
    imageSrc: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default DescriptiveCard