import axios from 'axios';

// const url = 'http://localhost:8000/api/v1'
const url = 'https://mc1.cryptosavannah.com/api/v1'

export const authenticateUser = async (username, password) => {
    try{
        const {status, data} = await axios.post(`${url}/accounts/authenticate/`, {
            username: username,
            password: password,
            type: 1
        })
        if(status===200){
            const {user_data, token_data:{token}, tenant_data} = data 
            return {user_data, token, tenant_data}
        } else{
            return {"status":404}
        }
    } catch(error) {
        return {"status":404}
    }
}