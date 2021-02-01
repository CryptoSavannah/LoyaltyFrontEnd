import axios from 'axios';

// const url = 'http://localhost:8000/api/v1'
const url = 'https://mc1.cryptosavannah.com/api/v1'

const token = localStorage.getItem("token");
const AuthStr = 'Bearer '.concat(token);

export const getPartnerships = async () => {
    try{
        const {status, data} = await axios.get(`${url}/loyalty/partnerships`, {
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

export const createPartnership = async(partnerName, partnerProduct, partnerContact, percentagePoints) => {
    try{
        const {status, data} = await axios.post(`${url}/loyalty/partnerships`, {
            partner_name: partnerName,
            partner_product: partnerProduct,
            partner_contact: partnerContact,
            percentage_points: percentagePoints,
        }, {headers: {Authorization: AuthStr}})
        if(status===200){ 
            return data.data
        } else{
            return {"status":404}
        }
    }catch(err){
        console.log(err)
    }
}

export const getPartnershipDetails = async(id) => {
    try{
        const {status, data} = await axios.get(`${url}/loyalty/partnerships/${id}`, {
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

export const deletePartnership = async (id) => {
    try{
        const {status, data} = await axios.delete(`${url}loyalty/partnerships/${id}`, {
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

