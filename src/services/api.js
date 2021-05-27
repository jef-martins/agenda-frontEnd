import Axios from 'axios'

export default Axios.create({
    baseURL: 'http://localhost/apiAgenda/public/api/'
})