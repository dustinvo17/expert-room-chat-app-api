
import axios from 'axios'
export const setToken = () => {
    const access_token = localStorage.getItem('access_token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
}
export const getUser = async (baseUrl)=> {
    setToken()
    const res = await axios.get(`${baseUrl}/profile`)
    return res.data
   
}
