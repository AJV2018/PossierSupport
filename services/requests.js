import instance from "./apiInstance";

const handleResolve = (response, resolve, reject) => {
    if (response.data && response.data.status == 200) {
        resolve(response.data)
    } else {
        reject(response.data?.message || 'Oops! Something went wrong!')
    }
}

export const addCategory = (name) => {
    return new Promise((resolve, reject) => {
        instance
            .post(
                '/support/addCategory',
                {
                    "name": name,
                    "platform": "all"
                })
            .then(res => handleResolve(res, resolve, reject))
            .catch(err => reject(err?.response?.data?.message || err.toString()))
    })
}

export const addSubCategory = (name, parent, content) => {
    return new Promise((resolve, reject) => {
        instance
            .post(
                '/support/addSubCategory',
                {
                    "name": name,
                    "platform": "all",
                    "parent": parent,
                    "content": content
                })
            .then(res => handleResolve(res, resolve, reject))
            .catch(err => reject(err?.response?.data?.message || err.toString()))
    })
}
export const getCatsAndSubs = () => {
    return new Promise((resolve, reject) => {
        instance
            .post('/support/getCatsAndSubs')
            .then(res => handleResolve(res, resolve, reject))
            .catch(err => reject(err?.response?.data?.message || err.toString()))
    })
}
export const createSupportTicket = (data) => {
    return new Promise((resolve, reject) => {
        instance
            .post('/support/addTicket', { ...data })
            .then(res => handleResolve(res, resolve, reject))
            .catch(err => reject(err?.response?.data?.message || err.toString()))
    })
}