import axios from 'axios';
import { userInfo } from 'os';
const jwt = require('jsonwebtoken');

const Myfunctions = {}

const postLogin = async function(cred) {
    console.log('entered post');
    try{
        const res = await axios.post('/api/login', cred) // cred = 'email', 'password'
        console.log('entered success');
        const token = res.headers["x-auth-token"];
        console.log("token:")
        console.log(token);
        sessionStorage.setItem('authToken', token);
        const decoded = jwt.decode(token, {complete: true});
        sessionStorage.setItem('myData', JSON.stringify(decoded.payload));
        console.log("data:")
        console.log(sessionStorage.authToken)
        console.log(sessionStorage.myData)
        //console.log(sessionStorage.getItem())
        console.log(decoded.payload.first_name)
        return true;
    } catch (err) {
        console.log(err.response.status + " " + err.response.data);
            return false;
    }
}


Myfunctions.postLogin = postLogin;
export default Myfunctions;