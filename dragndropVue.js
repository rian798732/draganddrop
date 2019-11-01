Vue.component('itemku',{
    props: ['src','id','alt','hrg'],
    template: `
        <div class="col-md-6" style="padding-top:10px;">
            <img class="imageItem" v-bind:src="src" v-bind:id="id" style="width:170px; height: 170px; background-color: blue;" v-bind:alt="alt" v-bind:hrg="hrg">
            <h5 class="text-warning pl-2">Rp  {{ hrg }} </h5>
        </div>
    `
})

var app = new Vue({

    el: "#app"
})