import Vue from "vue";
import Vuex from "vuex";
import ApiFetch from "../helpers/fetchUsersApi";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    listUsers: [],
    showModal: false,
    listUsersFinded: [],
    currentPage: 1, //Index for pagination
  },
  mutations: {
    // ListUsers Mutations
    updateListUsers(state, payload) {
      state.listUsers = payload;
    },
    removeUserFromState(state, payload) {
      state.listUsers = state.listUsers.filter((el) => el.id != payload.id);
      alert("User Deleted");
    },
    editUserList(state, index, user) {
      state.listUsers[index] = user;
      alert("User Updated Successfuly");
    },
    addUser(state, user) {
      state.listUsers.push(user);
      alert("User added successfuly");
    },
    // Modal Mutation
    showModal(state) {
      state.showModal = !state.showModal;
    },
    // listUsersFinded Mutations
    updatelistUsersFinded(state, payload) {
      state.listUsersFinded.push(payload);
      console.log(state.listUsersFinded);
    },
    //  Paginate Mutations
    updateCurrentPage(state, whereToGO) {
      if (whereToGO == "prev") {
        if (state.currentPage == 1) {
          state.currentPage = 5;
          return;
        }
        state.currentPage--;
        return;
      }
      if (whereToGO == "next") {
        if (state.currentPage == 5) {
          state.currentPage = 1;
          return;
        }
        state.currentPage++;
        return;
      }
    },
  },
  actions: {
    // Actions to paginate
    async paginate({ commit, state }, whereToGO) {
      commit("updateCurrentPage", whereToGO);
      this.dispatch("getUsersFromDB", state.currentPage);
    },

    //Actions for the listUsers
    async getUsersFromDB({ commit }, page) {
      try {
        const listUsers = await ApiFetch.getAllUser(page);
        commit("updateListUsers", listUsers);
      } catch (error) {
        return error;
      }
    },

    async deleteUserFromDB({ commit }, id) {
      try {
        const response = await ApiFetch.deleteUser(id);
        console.log(id);
        commit("removeUserFromState", response);
      } catch (error) {
        return error;
      }
    },

    async editUser({ commit, state }, user) {
      try {
        const response = await ApiFetch.updateUser(user.id, user);
        const userIndex = state.listUsers.findIndex((el) => el.id == user.id);
        commit("editUserList", userIndex, response);
      } catch (error) {
        return error;
      }
    },

    async createUser({ commit }, user) {
      try {
        const response = await ApiFetch.createUser(user);
        commit("addUser", response);
      } catch (error) {
        return error;
      }
    },
    //Actions for the modal
    openModal({ commit }) {
      commit("showModal");
    },
    // Actions to Specific search
    async findUserByName({ commit }, name) {
      try {
        const data = await ApiFetch.findUserByname(name);
        commit("updatelistUsersFinded", data);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async findUserSobrenome({ commit }, sobrenome) {
      try {
        const data = await ApiFetch.findUserBySobrenome(sobrenome);
        commit("updatelistUsersFinded", data);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async findUserByEmail({ commit }, email) {
      console.log(email);
      try {
        const data = await ApiFetch.findUserByEmail(email);
        commit("updatelistUsersFinded", data);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  getters: {
    getUsers(state) {
      return state.listUsers;
    },
    getModalStatus(state) {
      return state.showModal;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
  },

  modules: {},
});
