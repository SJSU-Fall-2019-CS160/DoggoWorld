import axios from 'axios';
const jwt = require('jsonwebtoken');

const Myfunctions = {}

const postLogin = async function(cred) {
    console.log('entered post');
    const res = await axios.post('/api/login', cred) // cred = 'email', 'password'
    if (res.status === 200) {
        console.log('entered success');
        const token = res.headers["x-auth-token"];
        console.log(token);
        localStorage.setItem('authToken', token);
        const decoded = jwt.decode(token);
        localStorage.setItem('myData', decoded.payload);
        return true;
    }
    return false;
}

Myfunctions.postLogin = postLogin;
export default Myfunctions;