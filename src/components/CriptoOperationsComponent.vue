<template>
  <div class="operations-container">
    <div class="calculator-container d-flex">
        <div class="options-currency">
            <label for="select-currency">Your wallet in: <b>BTC</b></label>
        </div>
        <div class="options-currency">
            <label for="select-currency-destination">Exchange to: </label>
            <select class="select-mony" name="select-currency" id="select-currency-destination" v-model="currencyTypeTo">
                <option value="BRL">BRL</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select>
        </div>
    </div>

    <div class="trade-container d-flex">
        <input disabled class="inp-text mony-text" type="number" v-model="inPocked" id="input-quantity-mony" placeholder="Enter the amount to exchange">
        <div class="return-value">
            <label for="apan-will-recibe">Will Receive: {{currencyTypeTo}}: </label>
        <span id="apan-will-recibe">{{willReceive}}</span>
        </div>
    </div>
    <div class="buy-button">
        <button class="btn btn-blue btn-buy" @click="sellCrypto">Buy</button>
    </div>
  </div>
</template>

<script>
import {fetchCurrency} from'../helpers/fetchBtcApi'
import {convertion} from '../helpers/conversion'
export default {
    props:['wallet'],
    data(){
        return{
            btcPrice: 0,
            currencyTypeTo:'BRL',
            inPocked: 0,
            willReceive:0
        }
    },
    async mounted(){
        //Initializing with the price of BTC over BRL
        try {
            const priceToday = await fetchCurrency.fetchGenericCurrencies('BTC-BRL')
            this.btcPrice = priceToday.BTCBRL.bid
        } catch (error) {
            console.log(error)
        }
        //Getting the wallet of the user if its Not new other wise it will be initialized in 0
        this.inPocked= this.wallet ? this.wallet : 0
    },

    methods:{
        sellCrypto:async function(){
           try {
                if(this.inPocked<=0){
                    return alert('Must have BTC to be able to sale')
                }
                const converted = await convertion(this.btcPrice,this.inPocked,this.currencyTypeTo)
                this.willReceive = converted
           } catch (error) {
               return alert('Algun problema en el server: Error 503')
           }
           
        },

        // Helpers
        
        
    }

}
</script>

<style>
.operations-container{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(3,1fr);
    gap: 10px;
    padding: 5px;
}
.calculator-container{
    grid-column: 1/3;
    justify-content: space-between;
}
.trade-container{
    grid-column: 1/3;
    grid-row: 2/3;
    justify-content: space-between;
}
.trade-container .mony-text{
    border:none;
    border-bottom: 1.5px solid blue;
}
.buy-button{
    grid-column: 1/3;
    grid-row: 3/4;
}
.btn-buy{
    width: 100%;
    height: 1.7rem;
}
</style>