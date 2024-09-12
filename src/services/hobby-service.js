import axios from './axios'

export const createHobbyRequest = () => axios.post('/hobby')
export const getHobbiesRequest = () => axios.get('/hobby')