<template>
  <div class="find-component bg-basecolor shadow">
      <form class="find-wrapper">
          <input type="text" class="inp-text" v-model="nome" placeholder="Nome">
          <input type="text" class="inp-text" v-model="sobrenome" placeholder="Sobrenome">
          <input type="email" class="inp-text" v-model="email" placeholder="E-mail">
          <button class="btn btn-find" @click.prevent="find">Search</button>
      </form>
  </div>
</template>

<script>
import {validations} from '../helpers/filters'
export default {
    data(){
        return{
            nome:'',
            sobrenome:'',
            email:''
        }
    },
    methods:{
        find:function () {
            try {
                if(!this.nome && !this.sobrenome && !this.email){
                return alert('You must especify at least 1 parametre to search')
            } 
            if(this.email && validations.emailValidator(this.email)){
                return this.$store.dispatch('findUserByEmail', this.email.trim())
            }
            if(this.nome){
                const name = validations.nameFilter(this.nome)
                return this.$store.dispatch('findUserByName',name)
            }
            if (this.sobrenome) {
                const lastName = validations.nameFilter(this.sobrenome)
                return this.$store.dispatch('findUserSobrenome', lastName)
            }
            return alert('No match was found')
            } catch (error) {
                return alert('No match was found')
            }
            
        }
    }
}
</script>

<style>
    .find-component{
        box-sizing: border-box;
        position: relative;
        padding: 1rem;
        margin: 2rem 0;
        border-radius: 5px;
        max-height: 4rem;
    }
    .find-wrapper{
        display: grid;
        grid-template-columns: repeat(3,1fr) auto;
        justify-content: center;
        column-gap: 25px;
        
    }

    .btn-find{
        height: 1.8rem;
        color: blue;
        border:2px solid blue;
    }

    .btn-find:hover{
        background-color: rgb(208, 250, 236);
        box-shadow: 0px 2px 2px black;
    }
</style>