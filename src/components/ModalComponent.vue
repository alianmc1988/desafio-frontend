<template>
  <div class="modal-wrapper shadow" >
      <!-- ################### Modal name (Add or Edit) ########################################### -->
    <div class="form-header">
        <h3>{{!ToEdit? 'Add a new Carteira':'Update a Carteira'}}</h3>
    </div>
    <!-- #################### Form (Add or Edit) ################################################## -->
    <form class="form-wrapper">
        <input class="inp-text capit" type="text" placeholder="Name" v-model="newUserData.nome" required>
        <input class="inp-text capit" type="text" placeholder="Last Name" v-model="newUserData.sobrenome" required>
        <input class="inp-text" type="email" placeholder="Email" v-model="newUserData.email" required>
        <input class="inp-text" type="text" placeholder="Address" v-model="newUserData.endereco" required>
        <input class="inp-text" type="datetime" placeholder="Birth date" v-model="newUserData.data_nascimento" required>
        <button @click.prevent="saveUser" class="btn btn-blue">Save</button>
    </form>
    <div class="cripto-container">
        <CriptoOperationsComponent :wallet="newUserData.valor_carteira"/>
    </div>
  </div>
</template>

<script>
import {validations} from '../helpers/filters'
import CriptoOperationsComponent  from './CriptoOperationsComponent.vue'
export default {
    name:'Modal',
    props:['ToEdit'],
    components:{
        CriptoOperationsComponent,
    },
   data(){       
      return{
         newUserData: {
            id:Math.random(), //To generate uniques id
            nome:'',
            sobrenome:'',
            email:'',
            endereco:'',
            data_nascimento:'',
            valor_carteira:Math.random(), //Add random amount of BTC when created
            endereco_carteira: Math.random(), //To generate uniques  endereco_carteira
            data_abertura:Date.now()
         }
      }
   },
    mounted(){
        //if the prop ToEdit commes empty then the form will be set to Add new User other wise wil be setted to Edit 
        // the one that commes in the prop
        if(this.ToEdit){
         this.newUserData = this.ToEdit
      }
        
    },
    
    methods:{
        saveUser:function(){
            // To edit or Create a new User, all inputs are required
            if(!this.newUserData.nome || !this.newUserData.sobrenome || !this.newUserData.email || !this.newUserData.endereco || !this.newUserData.data_nascimento){
                return alert('All the inputs are required')
            } 
            // check validity of  email
            if(!validations.emailValidator(this.newUserData.email)){
                return alert('invalid email')
            }
            // Switch the option to dispatch (Edit or create User)
            if(this.ToEdit){
                
                return this.$store.dispatch('editUser',this.newUserData)
            }
            return this.$store.dispatch('createUser',this.newUserData)
      }
        
   }
   

}
</script>

<style>
    .modal-wrapper{
        background-color: rgb(252, 252, 252) !important;
        position: relative;
        display: grid;
        z-index: 500;
        width: 60%;
        border-radius:5px ;
        grid-template-columns: repeat(3,1fr);
        grid-template-rows: repeat(3,1fr);
        gap:10px;
    }
    .form-header{

        grid-column: 2/3;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .form-wrapper{
        border: 2px solid black;
        position: relative;
        border-radius:5px ;
        padding: 25px;
        display: grid;
        justify-self: center;
        align-self: center;
        grid-template-columns: repeat(3,1fr);
        grid-column: 2/3;
        grid-row: 2/3;
        z-index: 1500;
        column-gap: 10px;
        row-gap: 10px;
    }
    .cripto-container{
        grid-row: 3/4;
        grid-column: 2/3;
    }
    .capit{
        text-transform: capitalize;
    }
</style>