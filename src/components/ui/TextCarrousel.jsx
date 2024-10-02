import PropTypes from 'prop-types'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import useCarousel from '../../hooks/useCarousel'

const TextCarrousel = ({ content }) => {
    const { currentIndex, handleNext, handlePrevious } = useCarousel(content)
    return (
        <>
            <Box display='flex' alignItems='center' justifyContent='center'>
                <IconButton onClick={handlePrevious}>
                    <ArrowBack />
                </IconButton>
                <motion.div key={currentIndex}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant='body1' sx={{ mx: 4, textAlign: 'center'}}>
                        {content[currentIndex]}
                    </Typography>
                </motion.div>
                <IconButton onClick={handleNext}>
                    <ArrowForward />
                </IconButton>
            </Box>

            <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                {content.map((_, index) => (
                    <Box key={index}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: index === currentIndex ? 'blue' : 'gray',
                            margin: '0 5px',
                            transition: 'background-color 0.3s ease'
                        }}
                    />
                ))}
            </Box>
        </>
    )
}

TextCarrousel.propTypes = {
    content: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default TextCarrousel