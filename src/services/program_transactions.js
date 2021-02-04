import axios from 'axios';

// const url = 'http://localhost:8000/api/v1'
const url = 'https://mc1.cryptosavannah.com/api/v1'

const token = localStorage.getItem("token");
const AuthStr = 'Bearer '.concat(token);

export const getLoyaltyTransactions = async () => {
    try {
        const { status, data } = await axios.get(`${url}/loyalty/2/transactions`, {
            headers: { Authorization: AuthStr }
        })
        if (status === 200) {
            console.log('Tx api data:' + data.data)
            return data.data
            // } else{
            //     return {"status": 404, "error": "Not Found"}
        }
    } catch (err) {
        console.log(err)
        return { "status": 500, "error": "Server Error" }
    }
}