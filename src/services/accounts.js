import axios from 'axios';

// const url = 'http://localhost:8000/api/v1'
const url = 'https://mc1.cryptosavannah.com/api/v1'

const token = localStorage.getItem("token");
const AuthStr = 'Bearer '.concat(token);

export const getLoyaltyUsers = async () => {
    try{
        const {status, data} = await axios.get(`${url}/tenant/loyalty/programs/subscriptions?id=1`, {
            headers: {Authorization: AuthStr}
        })
        if(status===200){
            return data.data
        // } else{
        //     return {"status": 404, "error": "Not Found"}
        }
    }catch(err) {
        console.log(err)
        return {"status": 500, "error": "Server Error"}
    }
}


export const getUserDetails = async(id) => {
    try{
        const {status, data} = await axios.get(`${url}/loyalty/users/${id}`, {
            headers: {Authorization: AuthStr}
        })
        if(status===200){
            return data.data
        // } else{
        //     return {"status": 404, "error": "Not Found"}
        }
    }catch(err) {
        console.log(err)
        return {"status": 500, "error": "Server Error"}
    }
}

export const deleteUser = async (id) => {
    try{
        const {status, data} = await axios.delete(`${url}/loyalty/users/${id}`, {
            headers: {Authorization: AuthStr}
        })
        if(status===200){
            return data.data
        // } else{
        //     return {"status": 404, "error": "Not Found"}
        }
    }catch(err){
        console.log(err)
        return {"status": 500, "error": "Server Error"}
    }
}

