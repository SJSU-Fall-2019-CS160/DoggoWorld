import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export const register = newUser => {
  return axios
    .post("/api/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
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
    .post("/api/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if (response.status === 200) {
        console.log(response);
        return response;
      }
    });
};

export const addProduct = async (url, price) => {
  return await axios.post(
    "/api/product",
    {
      url: url,
      price: price
    },
    {
      headers: { "X-AUTH-TOKEN": `${cookie.get("csrf_access_token")}` },
      withCredentials: true
    }
  );
};

export const getProfile = async () => {
  const response = await axios.get("/api/profile", {
    headers: { "X-AUTH-TOKEN": `${cookie.get("csrf_access_token")}` },
    withCredentials: true
  });
  return response.data;
};

export const deleteEmail = async email => {
  console.log(cookie.get("csrf_access_token"));
  const response = await axios.delete("/api/user/email", {
    headers: { "X-AUTH-TOKEN": `${cookie.get("csrf_access_token")}` },
    data: {
      email: email
    }
  });
  return response;
};

export const getComment = async (retailer, id) => {
  const response = await axios.get(`/api/comment/${retailer}/${id}`);
  return await response.data;
};

export const postComment = async (comment, retailer, id) => {
  const response = await axios.post(
    "/api/comment",
    {
      comment: comment,
      retailer: retailer,
      product_id: id
    },
    {
      headers: { "X-CSRF-TOKEN": `${cookie.get("csrf_access_token")}` },
      withCredentials: true
    }
  );
  return response;
};

export const logout = async () => {
  const response = await axios.delete("/api/revoke", {
    withCredentials: true
  });
  return await response.data;
};
