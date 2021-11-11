<template>
  <div class="tableComponent bg-basecolor shadow">
      <table class="table-grid">        
       <thead>
          <th>No.</th>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Email</th>
          <th>Bitcoin</th>
       </thead>
       <tbody>
         <tr v-for="(user,index) in usersData" :key="user.id">
           <td>{{index +1}}</td>
           <td>{{user.nome}}</td>
           <td>{{user.sobrenome}}</td>
           <td>{{user.email}}</td>
           <td>{{user.valor_carteira}}</td>
           <td>
             <button @click="editUser(user)" class="btn btn-blue">Edit</button>
           </td>
           <td>
             <button class="btn btn-red" @click="deleteUser(user.id)">Delete</button>
           </td>
         </tr>
       </tbody>      
      </table>
      <div class="pagination">
          <button class="btn-pagination prev" @click="paginate('prev')">Prev</button>
          <b>{{page}}</b>
          <button class="btn-pagination next" @click="paginate('next')">Next</button> 
      </div> 
  </div>
</template>

<script>
import {store} from '../store'
export default {
  data(){
    return{
      usersData: this.$store.getters.getUsers,
      page:this.$store.getters.getCurrentPage
    }
  },
  computed:{
    changes:function () {
      return store.getters.getUsers
    },
    filtered:function () {
      return store.state.listUsersFinded
    },
    toPaginate:function() {
      return store.getters.getCurrentPage
    }
  },
  watch:{
    changes:function () {
      this.usersData = store.getters.getUsers
    },
    filtered:function(){
      if(!store.state.listUsersFinded[0])return alert('No match was founded')
      this.usersData = store.state.listUsersFinded
    },
    toPaginate:function () {
      this.page = store.getters.getCurrentPage
    }
  },
  methods:{
    deleteUser: async function(id){
      try {
        await this.$store.dispatch('deleteUserFromDB',id)
         this.usersData = this.usersData.filter(el=>el.id !== id)
      } catch (error) {
        console.log(error)
      }
    },
    editUser:function(user){
      this.$emit('editThisUser',user)
    },
    paginate:function(whereToGO){
   
      this.$store.dispatch('paginate',whereToGO)
    }
    
  },
  
}
</script>

<style>
  .tableComponent{
    display: grid;    
    position: relative;
    box-sizing: border-box;
    justify-content: center;
    align-self: center;
    border-radius: 5px;
    height: 31rem;
    padding: 20px;
  }
  
  th{
    text-align: left;
    border-bottom: 2px solid black;
  }
  .table-grid{ 
    width: 100%;
    padding: 1rem;
    box-sizing: content-box;
    display: table;
  }
  tr:hover{
    background: rgb(240, 238, 238);
  }
  .btn-export{
    width: 3rem;
    align-self: center;
  }
.pagination{
    display: flex;
    align-items: center;
    justify-content: center;
  }
.btn-pagination{
  background-color: transparent;
  border: none;
  color: darkblue;
   
}
.next::after{
  content: ">>";
}
.prev::before{
  content: "<<";
}
.btn-pagination:hover{
  color: rgb(49, 49, 218);
   border-bottom: 2px solid blue;
}
.btn-pagination:active{
  color: blue;
}
</style>

