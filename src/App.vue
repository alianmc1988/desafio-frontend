<template>
  <div id="app">
    <!-- ########################### Modal Component ###################### -->
    <div class="modal-component d-flex" v-if="showModal">
      <button class="btn close-button" @click="showHideModal">X</button>
      <ModalComponent :ToEdit="userToEdit" class="modal" />
    </div>

    <!-- ############################ Navbar ##############################-->
    <header>
      <Navbar />
    </header>
    <!-- ######################### App Body ################################# -->
    <div class="body-wrapper">
      <!-- ############## Carteiras & Adicionar Button #######################-->
      <div class="btcexport d-flex">
        <div class="btc-name">
          <h2>BTC Carteiras</h2>
        </div>
        <div class="add-wrapper d-flex">
          <button class="btn btn-blue shadow btn-add" @click="showHideModal">
            Adicionar Carteira
          </button>
        </div>
      </div>
      <!-- ##################### Filter Section ########################### -->
      <div class="filter-component">
        <FilterComponent />
      </div>
      <!-- ##################### Users Table Section ####################### -->
      <div class="table-component">
        <LoadingComponent v-if="!showTable" />
        <TableComponent v-if="showTable" @editThisUser="editUser" />
      </div>
    </div>
    <!-- ######################## Footer ################################### -->
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<script>
import TableComponent from "./components/TableComponent.vue";
import Navbar from "./components/Navbar.vue";
import FilterComponent from "./components/FilterComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import ModalComponent from "./components/ModalComponent.vue";
import LoadingComponent from "./components/loadingComponent.vue";
export default {
  name: "App",

  components: {
    TableComponent,
    Navbar,
    FilterComponent,
    FooterComponent,
    ModalComponent,
    LoadingComponent,
  },
  data() {
    return {
      showTable: false,
      showModal: false,
      userToEdit: null,
    };
  },
  mounted() {
    this.$store
      .dispatch("getUsersFromDB", this.page)
      .then(() => {
        this.showTable = true;
      })
      .catch((err) => {
        console.log(err);
        return alert("An error occured at the server");
      });
  },
  watch: {
    page: async function() {
      await this.$store.dispatch("getUsersFromDB", this.page);
    },
  },
  methods: {
    showHideModal() {
      this.showModal = !this.showModal;
      if (this.showModal === false) {
        this.userToEdit = null;
      }
    },
    editUser(user) {
      this.userToEdit = user;
      this.showModal = !this.showModal;
      return;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(216, 214, 214);
  margin: 0;
  padding: 0;
  min-width: 600px;
}
.body-wrapper {
  display: grid;
  grid-template-columns: 250px auto 250px;
  grid-template-rows: repeat(3, auto);
}

.filter-component {
  grid-column: 2/3;
  grid-row: 2/3;
  display: grid;
  justify-content: center;
}
.table-component {
  grid-column: 2/3;
  grid-row: 3/4;
  display: grid;
  justify-content: center;
}

.btcexport {
  justify-content: space-around;
  grid-column: 2/3;
  grid-row: 1/2;
}
.btc-name {
  margin-left: 0;
  padding-left: 0;
}

/* Common Styles */

.bg-basecolor {
  background-color: rgb(247, 247, 247);
}

.btn {
  height: 25px;
  border-radius: 5px;
}
.btn-add {
  margin: auto;
}
.btn:hover {
  background-color: rgb(208, 250, 236);
  box-shadow: 0px 2px 2px black;
}
.btn-blue {
  background: rgb(15, 124, 248);
  color: white;
}
.btn-red {
  background-color: red;
  color: white;
}
.close-button {
  position: relative;
  border-radius: 50%;
  background-color: red;
  align-self: flex-start;
  justify-self: end;
  margin-top: 10px;
}
.d-flex {
  display: flex;
}
footer {
  bottom: 1;
}
.inp-text {
  border: 1px solid rgb(211, 210, 210);
  height: 1.5rem;
  border-radius: 5px;
  padding: 2px;
  /* margin-right: 2rem; */
  width: 10rem;
  position: relative;
  border: none;
  border-bottom: 1.5px solid blue;
  outline: none;
}
.inp-text:hover {
  background-color: rgb(208, 250, 236);
  outline: none;
}

.modal-component {
  box-sizing: border-box;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: rgba(56, 56, 56, 0.829);
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.shadow {
  box-shadow: 2px 5px 16px black;
}
</style>
