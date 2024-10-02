import { useEffect, useState } from 'react'

export const useErrors = (initialErrors = []) => {
    const [errors, setErrors] = useState(initialErrors)

    useEffect(() => {
        setErrors(initialErrors)
    }, [initialErrors])

    useEffect(() => {
        if (errors.length > 0) {
            const timers = errors.map((_, index) => 
                setTimeout(() => {
                    setErrors(prevErrors => prevErrors.filter((_, i) => i !== index))
                }, (index + 1) * 3000)
            )
            return () => timers.forEach(clearTimeout)
        }
    }, [errors])

    return { errors, setErrors }
}