import axios from "axios";

const instance = axios.create({
  baseURL: "https://floating-badlands-51132.herokuapp.com/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const API = {
  getRegister(data) {
    return instance
      .post("/auth/register", data)
      .then((responce) => {
        return responce.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  },
  getLogin(data) {
    return instance
      .post("/auth/login", data)
      .then((responce) => {
        return responce.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  },
  getData(token) {
    return instance
      .get("/all", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((responce) => {
        return responce.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getCreate(token, data) {
    return instance
      .post("/item", data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((responce) => {
        return responce;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getDelete(token, id) {
    return instance
      .delete(`/item/${id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((responce) => {
        return responce.status;
      });
  },
  getPatch(token, id, data) {
    return instance
      .patch(`/item/${id}`, data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((responce) => {
        return responce.status;
      });
  },
  getDetails(token, id) {
    return instance
      .get(`/item/${id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((responce) => {
        return responce.data;
      });
  },
};

export default API;
