import axios from 'axios';

// const url = 'http://localhost:8000/api/v1'
const url = 'https://mc1.cryptosavannah.com/api/v1'

const token = localStorage.getItem("token");
const AuthStr = 'Bearer '.concat(token);

export const getPrograms = async () => {
    try{// ...need to check if this API actually works
        const {status, data} = await axios.get(`${url}/loyalty/1/programs`, {
            headers: {Authorization: AuthStr}
        })
        console.log( 'programs api token:' + token)
        if(status===200){
            console.log( 'programs :' + JSON.stringify(data.data))
            return data.data
        // } else{
        //     return {"status": 404, "error": "Not Found"}
        }
    }catch(err) {
        console.log(err)
        return {"status": 500, "error": "Server Error"}
    }
}

export const createProgram = async(programName, productsAttached, programPercentage, startDate, dueDate) => {
    try{
        const {status, data} = await axios.post(`${url}/loyalty/programs`, {
            program_name: programName,
            products_attached: productsAttached,
            program_percentage: programPercentage,
            start_date: startDate,
            due_date: dueDate,
            related_tenant: 1
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

export const getProgramDetails = async(id) => {
    try{
        const {status, data} = await axios.get(`${url}/loyalty/programs/${id}`, {
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

export const deleteProgram = async (id) => {
    try{
        const {status, data} = await axios.delete(`${url}/loyalty/programs/${id}`, {
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

