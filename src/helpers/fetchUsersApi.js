import { URL_USERS_API } from "../../config";

const API_CONFIG = {
  url: URL_USERS_API,
  headers: {
    "Content-type": "Application/json",
  },
};

export default {
  getUnrestrictedUsers: async function() {
    try {
      const res = await fetch(API_CONFIG.url);
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  },
  getOneUser: async (id) => {
    try {
      const response = await fetch(API_CONFIG.url + `/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  },
  createUser: async (newUser) => {
    newUser = JSON.stringify(newUser);
    try {
      const response = await fetch(API_CONFIG.url, {
        method: "POST",
        headers: API_CONFIG.headers,
        body: newUser,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  },
  updateUser: async (id, userEdited) => {
    userEdited = JSON.stringify(userEdited);
    try {
      const response = await fetch(API_CONFIG.url + `/${id}`, {
        method: "PUT",
        headers: API_CONFIG.headers,
        body: userEdited,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await fetch(API_CONFIG.url + `/${id}`, {
        method: "DELETE",
        headers: API_CONFIG.headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  // Find users with specific params
  findUserByname: async function(name) {
    console.log(name);
    try {
      const data = await this.getUnrestrictedUsers();
      const userFinded = data.find((el) => el.nome == name);
      return userFinded;
    } catch (error) {
      return error;
    }
  },
  findUserBySobrenome: async function(sobrenome) {
    const data = await this.getUnrestrictedUsers();
    const userFinded = data.find((el) => el.sobrenome == sobrenome);
    return userFinded;
  },
  findUserByEmail: async function(email) {
    const data = await this.getUnrestrictedUsers();
    const userFinded = data.find((el) => el.email == email);
    return userFinded;
  },
  // Get Users by Paginations
  getAllUser: async (page) => {
    try {
      const response = await fetch(API_CONFIG.url + `/?_page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  },
};
