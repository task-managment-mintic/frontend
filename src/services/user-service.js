import axios from './axios'

export const createAccountRequest = user => axios.post('/user', user)
export const loginAccountRequest = user => axios.post('/user/login', user)
export const getProfileRequest = () => axios.get('/user')
export const updateAccountRequest = user => axios.put('/user', user)
export const updateProfileImgRequest = profile_img => axios.put('/user/img', profile_img)
export const updatePasswordRequest = user => axios.put('/user/pwd', user)