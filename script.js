Vue.component('board',{
    template: "#board",
    props: ['id'],
    methods: {
        drop: e => {
            // untuk mengambil data yang dikirimkan melalui line 61
           const card_id =  e.dataTransfer.getData('card_id')
            //const c = document.getElementById(card_id)

        // variabel card adalah mencari element yang idnya card_id di area drop, cloneNode agar ketika didrop tidak hilang
           const card = document.getElementById(card_id).cloneNode(true)
        //varable wadah adalah area untuk drop
           const wadah = document.getElementById('board-2')
            // consosle.log(e)

            // jika onChart card_id tidak terdeteksi maka lakukan ...
            if(vo.onCart[card_id] === undefined){
                //set menjadi 1
               vo.onCart[card_id] = 1

               // buat element baru yang mempunyaoi tag small
               var jumlah = document.createElement('small')

               // Set attribut
               jumlah.setAttribute('id','jumlah-'+card_id)

            //    set jumlah dengan vo.onCart[card_id] yang baru
               jumlah.innerHTML = 'Jumlah : '+vo.onCart[card_id]

               // style css
               jumlah.style.fontSize = '20pt'
               jumlah.style.position = 'absolute'
               jumlah.style.left = '260px'
               jumlah.style.top = '88px'

               //append child untuk merender jumlah yang baru / masukkan jumlah kedalam card
               card.appendChild(jumlah)
               // set atribut card menjadi draggable false
                card.setAttribute('draggable','false')

                // msaukkan card kedalam wadah
                wadah.appendChild(card)

                // buat element baru yang mempunyai tag span
                var cl = document.createElement('span')
                // isi dengan tanda x
                cl.innerHTML = '&times';

                // querySelectorAll Untuk mengambil semua element yang sama
                // cari btnClose yang mempunyai id yang diterima card_id dan cari dia ada di index keberapa kemudian masukkan variabel cl yang berisi span 
                document.querySelectorAll("[btnclose='"+card_id+"']")[1].appendChild(cl)

                // hapus element yang mempunyai class .tmptBTN  terakhir kemudian hapus class d-none
                $('.tmptBTN').last().removeClass('d-none')
            }
            else{
               
                // jika vo.onCart card_id sudah ada maka tambah 1 setiap kali masuk
                vo.onCart[card_id] ++

                //children adalah anak dari parent, closest jika ada elemen yang sama maka akan dicari yang paling pertama dari parent
                $(wadah).children().children().closest('#jumlah-'+card_id)[0].innerHTML = 'Jumlah : '+vo.onCart[card_id]
            }
           
            /// vo.count ++
            vo.count ++

            // total parseFloat card yang mempunyai atribut harga agar menjadi bilangan desimal
            vo.total += parseFloat(card.getAttribute('harga'))
        }
    } 
})

// ambil component card yang ada didalam app tagnya <card></card>
Vue.component('card',{
    // ambil <template></template> yang mmempunyai id card
    template: '#card',

    // props ambil dari templatenyya
    props: ['id','draggable'],

    // buat method untuk mengeset data
    methods: { 
        dragStart: e => {
            const target = e.target

            // set data card_id dengan target.id
            e.dataTransfer.setData('card_id',target.id)
        }
    }
})

// buat variable iuntuk new vue
var vo = new Vue({
    //ambil div yang mempunyai id app
    el:"#app",

    // taruh semua data disini
    data: {
        onCart :[],
        total:0,
        count:0,
        barang:[
            {idbrg:1 ,nama: "barang 1", harga: '1000'},
            {idbrg:2 ,nama: "barang 2", harga: '2000'},
            {idbrg:3 ,nama: "barang 3", harga: '3000'},
            {idbrg:4 ,nama: "barang 4", harga: '4000'},
            {idbrg:5 ,nama: "barang 5", harga: '5000'}
        ]
    }
})

//button hapus
$(document).on('click','.btnHapus',function(){
    // alert($(this).attr('class'))
    /// Mengambil harga dari attribut button
    var hrg = $(this).attr('hrg')


    var count = $(this).siblings().last().html().replace('Jumlah : ','')
    var total = vo.total
    var vcount = vo.count
    var t = parseInt(hrg) * parseInt(count)
    
    vo.total = total - t
    var index = $(this).parent().attr('id')
    vo.onCart[index] = undefined;
    vo.count = parseInt(vcount) - parseInt(count)
    //alert(vo.count)
    $(this).parent().remove()

    
})

//button tambah
$(document).on('click','.btnT',function(){
    // ambil attribut harga dari this (buttonya)
    var hrg = $(this).attr('hrg')

    // variabel count untuk mengambil nilai dari text jumlah
    var count = $(this).parent().parent().siblings().last().html().replace('Jumlah : ','')
    // alert(count)

    // Mengambil nilai dari variabel vo didalam data
    var vc = vo.count;

    //proses penambahan
    var c = parseInt(count) + 1

    // index diambil dari attr id
    var index = $(this).parent().parent().parent().attr('id')
    //alert(index)
    
    $(this).parent().parent().siblings().last().html('Jumlah : '+c)
    vo.count = vc + 1
    var vt = vo.total;
    vt = vt - (parseInt(count)* parseInt(hrg))
    // alert(vt)
    vo.total = vt + (parseInt(c)* parseInt(hrg))
    // alert(vo.total)
})

//button kurang
$(document).on('click','.btnH',function(){
    var hrg = $(this).attr('hrg')

    /// untuk mengambil nilai jumlah
    var count = $(this).parent().parent().siblings().last().html().replace('Jumlah : ','')
    console.log($(this).parent())
    // alert(count)
    var vc = vo.count;

    /// parseInt berfungsi agar menjadi angka dengan ketentuan string berisi angka
    var c = parseInt(count) - 1
    var index = $(this).parent().parent().parent().attr('id')
    //alert(index)
    $(this).parent().parent().siblings().last().html('Jumlah : '+c)
    vo.count = vc - 1
    var vt = vo.total;
    vt = vt - (parseInt(count)* parseInt(hrg))
    // alert(vt)
    vo.total = vt + (parseInt(c)* parseInt(hrg))

    if(c == 0){
        vo.onCart[index] = undefined;
        $(this).parent().parent().parent().remove()
    }
})