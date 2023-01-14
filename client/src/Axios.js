import  axios from 'axios'

const instance = axios.create({
    baseURL:'https://weshare.fun/api'
})

export default instance  