import axios from 'axios'

const instance =axios.create({baseURL:'http://localhost:60929/api/'})
export default instance