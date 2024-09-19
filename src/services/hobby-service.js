import axios from './axios'

export const createHobbyRequest = hobby => axios.post('/hobby', hobby)
export const getHobbiesRequest = () => axios.get('/hobby')
export const getHobbyRequest = id => axios.get(`/hobby/${id}`)