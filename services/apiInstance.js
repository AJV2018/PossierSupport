var axios = require('axios').default
// const baseURL = 'http://localhost:8083'
const baseURL = 'http://beta.possier.com'
const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

export default instance;