import axios from "axios"

//TODO cargarlo de un .env
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Cache-Control"] = "no-cache";

const token = Buffer.from(`apiuser:p1l4bl4nc4`, 'utf8').toString('base64')

const auth= {
    username: 'apiuser',
    password: 'p1l4bl4nc4'
};

export function getCreateDeviceForm() {
    console.log("entro")
    return axios.get(`/inventory/topology/devices`,{
        headers: {
            'Authorization': `Basic ${token}`
        }
    },{
        username: 'apiuser',
        password: 'p1l4bl4nc4'
    });
}
