import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export const register = newUser => {
  return axios
    .post("http://localhost:5000/api/users", {
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const login = user => {
  return axios
    .post("http://localhost:5000/api/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    });
};

export const getProfile = async () => {
  const response = await axios.get("/api/user", {
    headers: { "x-auth-token": `${cookie.get("csrf_access_token")}` },
    withCredentials: true
  });
  return response.data;
};

export const logout = async () => {
  const resp = await axios.delete("/api/revoke", {
    withCredentials: true
  });
  return resp.data;
};
