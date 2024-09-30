import { useEffect, useState } from 'react'

const useCarousel = (content) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % content.length)
    }

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => 
            prevIndex === 0 ? content.lenght - 1 : prevIndex - 1
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext()
        }, 3500)

        return () => clearInterval(interval)
    }, [currentIndex])

    return { currentIndex, handleNext, handlePrevious }
}

export default useCarousel